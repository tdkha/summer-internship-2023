const {pool,getConnection} = require('./connection');

const roleDB = {
    //-------------------------------------------------
    //  Get user role (after login) 
    //  Authenticate role-based request (admin vs student)
    //-------------------------------------------------
    selectUserRole : async (user_id) => {
        try{
            const [connection] =  await pool.execute(`SELECT (SELECT title FROM roles WHERE id = role_id) AS 'role' FROM user_roles WHERE user_id = ?`,[user_id])
            return connection;
        }catch(err){
            console.log("Error in user_roles table querrying");
            console.log(err)
        }    
    },

};

module.exports = roleDB