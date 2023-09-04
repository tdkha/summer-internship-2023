const cookieParser = require('cookie-parser');
const projectDB = require('../db/projectDB');
const studentDB = require('../db/studentDB');
const { getEncryptedInfoByToken } = require('../lib/token/jwtUtils');

const studentController = {
    getRegisteredProjects : async ( req, res ) => {
        try{
            //-----------------------------------
            //  Getting user_id from encrypted JWT 
            //-----------------------------------
            const cookie = req.cookies
            const token = cookie.accessToken
            const decode = await getEncryptedInfoByToken(token)
            const user_id = decode.user_id;
            const {id} = await studentDB.selectStudentID(user_id) //student_id
            const projects = await projectDB.selectProjectNameByStudentID(id);
            res.status(200).json(projects);

        }catch(err){
            console.log(err)
            res.status(500).json("Error in getting registered projects")
        }
    },
    getCompletedProjects : async ( req, res ) => {
        try{
            //-----------------------------------
            //  Getting user_id from encrypted JWT 
            //-----------------------------------
            const cookie = req.cookies
            const token = cookie.accessToken
            const decode = await getEncryptedInfoByToken(token)
            const user_id = decode.user_id;
            const {id} = await studentDB.selectStudentID(user_id) //student_id
            const projects = await projectDB.selectFinishedProjectsByStudentID(id);
            res.status(200).json(projects);

        }catch(err){
            console.log(err)
            res.status(500).json("Error in getting registered projects")
        }
    },
    addProjects : async ( req, res ) => {
        try{
            const projects = req.body.projects;
            //-----------------------------------
            //  Getting user_id from encrypted JWT 
            //-----------------------------------
            const cookie = req.cookies
            const token = cookie.accessToken
            const decode = await getEncryptedInfoByToken(token)
            const user_id = decode.user_id;
            const {id} = await studentDB.selectStudentID(user_id) //student_id
            const response = await projectDB.insertProjectsByStudentID(id,projects)
            res.status(200).json("OK");

        }catch(err){
            console.log(err)
            res.status(500).json("Error in adding projects")
        }
    },
    removeProject : async ( req, res ) => {
        try{
            const project = req.body.project;
            //-----------------------------------
            //  Getting user_id from encrypted JWT 
            //-----------------------------------
            const cookie = req.cookies
            const token = cookie.accessToken
            const decode = await getEncryptedInfoByToken(token)
            const user_id = decode.user_id;
            const {id} = await studentDB.selectStudentID(user_id) //student_id
            await projectDB.removeProjectByStudentID(id, project); 
            res.status(200).json("OK");
        }catch(err){
            console.log(err)
            res.status(500).json("Error in removing projects")
        }
    },
}
module.exports = studentController;