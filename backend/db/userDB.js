const {pool,getConnection} = require('./connection');

const userDB = {
    //-*------------------------------------------------*-
    // <SELECT> PASSWORD FROM users TABLE
    //-*------------------------------------------------*-
    selectUserPWD : async(username,) => {
        try{
            const [connection] =  await pool.query(
                `SELECT password FROM users
                 WHERE username = ?
                `,[username])
            return connection[0];
        }catch(err){
            console.log("Error in users table querrying");
            console.log(err)
        }    
    },
     //-*------------------------------------------------*-
    // <SELECT> ID FROM users TABLE
    //-*------------------------------------------------*-
    selectUserID : async(username) => {
        try{
            const [connection] = await pool.query('SELECT id FROM users WHERE username = ?',[username])
            return connection[0];
        }catch(err){
            console.log("Error in users table querrying");
            console.log(err)
        }
    },
     //-*------------------------------------------------*-
    // <Create> new user
    //-*------------------------------------------------*-
    createNewUser : async(username,password) => {
        try{
            const [connection] = await pool.query('INSERT INTO users (username,password) VALUES(?,?)',[username,password]);
            return connection[0];
        }catch(err){
            console.log("Error in users table querrying");
            console.log(err)
        }
    },

     //-*------------------------------------------------*-
    // <UPDATE> PASSWORD FROM users TABLE
    //-*------------------------------------------------*-
    updateUserPWD : async(username,new_pwd) =>{
        try{
            const connection = await pool.query(
                `UPDATE TABLE users
                    SET password = ?
                    WHERE username = ?
                `
                ,[new_pwd,username]
                
            );
            return connection;
        }catch(err){
            console.log("Error in users table querrying");
            console.log(err);
        }
    },
    //-*------------------------------------------------*-
    // <Select> username FROM users TABLE
    //-*------------------------------------------------*-
    selectUsername : async(username) =>{
        try{
            const [connection] = await pool.query(
                `SELECT username from users where username = ?`
            ,[username]);
            return connection[0];
        }catch(err){
            console.log("Error in users table querrying");
            console.log(err);
        }
    }
}

module.exports = userDB;