const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userDB = require('../db/userDB');
const degreeDB = require("../db/degreeDB");
const studentDB = require("../db/studentDB");
const roleDB = require("../db/roleDB");
const adminDB = require("../db/adminDB");
const applicationDB = require('../db/applicationDB');
const {getEncryptedInfoByToken} = require('../lib/token/jwtUtils')

const authController = {
//-*------------------------------------------------*-
    // GENERATE ACCESS TOKEN 
    //  BASED ON ACCESS TOKEN STORE IN ENV FILE
    //-*------------------------------------------------*-
    generateAccessToken: (user_id, roles) => { 
        return jwt.sign(
        {
            user_id: user_id,
            roles: roles,
        },
        process.env.JWT_ACCESS_TOKEN,
        { expiresIn: "4h" }
        );
    },

    //-*------------------------------------------------*-
    // GENERATE REFRESH TOKEN 
    //  BASED ON REFRESH TOKEN STORE IN ENV FILE
    //-*------------------------------------------------*-
    generateRefreshToken: (user_id, roles) => {
        return jwt.sign(
        {
            user_id: user_id,
            roles: roles,
        },
        process.env.JWT_REFRESH_TOKEN,
        { expiresIn: "1d" }
        );
    },
    //-*------------------------------------------------*-
    // REGISTER ONE NEW USER ACCOUNT
    //-*------------------------------------------------*-
    registerUser : async(req,res) =>{
        try{
            const user_info = req.body.user_info;
            //--------User Info-----------
            const username = user_info.username;
            const password = user_info.password;
            const hash = bcrypt.hashSync(password, 13);
             // Validate username
            const invalidUser = await userDB.selectUsername(username);

            // check for the existence of <username> in official students table        
            if(invalidUser) {
                return res.status(403).json({message:"Username existed. Please choose a different one"}); 
            }else{
                // check for the existence of <username> in applications table (unofficial)
                const invalidUser = await applicationDB.selectUserName(username);
                if(invalidUser) return res.status(403).json({message:"Username existed in another application. Please choose a different one or contact us"});
            }

            //--------Personal Info-----------
            const firstname = user_info.firstname;
            const lastname  = user_info.lastname;
             // Validate student number
            const student_number = user_info.student_number;
            if(student_number){
                // check for the existence of <student_number> in official students table    
                const invalidStudentNum =  await studentDB.selectStudentNumber(student_number);
                if(invalidStudentNum){
                    return res.status(403).json({message:"Student numbers existed. Please choose a different one or contact us"});
                }else{
                    // check for the existence of <student_number> in applications table (unofficial)
                    const invalidTempStudentNum = await applicationDB.selectStudentNumber(student_number);
                    if(invalidTempStudentNum){
                        return res.status(403).json({message:"Student number existed in another application. Please choose a different one or contact us"});
                    }
                }
            } 
            //--------Contact Info-----------
            // Validate phone number
            const phone = user_info.phone;
            // check for the existence of <phone> in official students table    
            const invalidPhone = await studentDB.selectPhone(phone);
            if(invalidPhone){
                return res.status(403).json({message:"Phone number existed. Please choose a different one or contact us"});
            }else{
                // check for the existence of <phone> in applications table (unofficial)
                const invalidTempPhone = await applicationDB.selectPhone(phone);
                if(invalidTempPhone) return res.status(403).json({message:"Phone number existed in another application. Please choose a different one or contact us"});
            }
            // Validate email
            const email = user_info.email;
            // check for the existence of <email> in official students table 
            const invalidEmail = await studentDB.selectEmail(email);
            if(invalidEmail){
                return res.status(403).json({message:"Email existed. Please choose a different one or contact us"});
            }else{
                // check for the existence of <email> in applications table (unofficial)
                const invalidTempEmail = await applicationDB.selectEmail(email);
                if(invalidTempEmail) return res.status(403).json({message:"Email existed in another application. Please choose a different one or contact us"});
            }
            const address = user_info.address;
            
             // --------Inseting to DB-----------
            const query = await applicationDB.insertApplication(firstname, lastname,student_number,email,phone,address,username,hash)         
            res.status(200).json("Accounts have been created");
        }catch(err){
            console.log("Error in registering new users");
            console.log(err)
            res.status(500).json({message:"Failed to register. Please try again"})
        }
    },

    loginUser : async (req, res) => {
        try{
            const username = req.body.username;
            const password = req.body.password;
            let userID = await userDB.selectUserID(username);
                userID = userID.id;
            const userPwd = await userDB.selectUserPWD(username,password);
            let roles = await roleDB.selectUserRole(userID);
                roles = roles.map( (element) => element.role);

            const validPwd = await bcrypt.compare(
                password,
                userPwd.password
            );

            if(!validPwd){
                res.status(401).json({message:"Incorrect username or password"})
            }else{
                const accessToken =  authController.generateAccessToken(userID , roles);
                const refreshToken =  authController.generateRefreshToken(userID , roles);
                
                if(roles.includes("Admin")){
                    const {firstname , lastname , email} = await adminDB.getAdminInfo(userID);
                    const fullName = firstname.concat(" ", lastname);

                    const jsonData = {
                        fullName : fullName,
                        email: email,
                        directPath: "/admin",
                        //refreshToken : refreshToken
                    }
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                        secure: true, // Ensures the cookie is only sent over HTTPS
                        //maxAge: 3600000, // Sets the cookie expiration time in milliseconds (e.g., 1 hour)
                      });
                    res.status(200).json(jsonData)
                    
                }else{
                    const {firstname , lastname , email} = await studentDB.selectOneStudent(userID);
                    const fullName = firstname.concat(" ", lastname);

                    const jsonData = {
                        fullName : fullName,
                        email: email,
                        directPath: "/student",
                        //refreshToken : refreshToken
                    }
                    res.cookie('accessToken', accessToken, {
                        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                        secure: true, // Ensures the cookie is only sent over HTTPS
                        //maxAge: 3600000, // Sets the cookie expiration time in milliseconds (e.g., 1 hour)
                      });
                    res.status(200).json(jsonData)
                }

            }

        }catch(err){
            console.log("Error in login ")
            res.status(403).json({message:"Failed to log in. Please try again"})
        }
    },
    persistLogin : async ( req , res ) => {
        try{
            //------------------------------------------------------------------------
            // decoding user_id from JWT
            ///------------------------------------------------------------------------
            const cookie = req.cookies  ;    
            const token = cookie.accessToken;

            if(!token) return res.status(401).json({message:"Unauthorized"})
            const decode = await  getEncryptedInfoByToken(token)
            
            const [role] = decode.roles; 
            const path = '/' + role.slice(0,1).toLowerCase() + role.slice(1)

            const jsonData = {
                directPath: path
            }
            
            if(role) return res.status(200).json(jsonData)
        }catch(err){
            res.status(401).json({message:"Unauthorized"})
        }
    },
    logOut :  async ( req , res ) => {
        const cookies = req.cookies ;     
        const token = cookies.accessToken;
        res.cookie('accessToken', {maxAge: 0});
        res.status(200).json("OK")
    }, 
    changePassword : async (req,res) => {
        const username = req.body.username;
        const password = req.body.password;
        const new_password = req.body.new_password;
        const query_password = await userDB.selectUserPWD(username);


    }
};
module.exports = authController;