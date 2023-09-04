const { pool, getConnection } = require("./connection");

const  adminDB  = {
    getAdminInfo : async (user_id) => {
        try{
            const [query] = await pool.query(`
                SELECT * FROM admins
                WHERE user_id = ?
            `,[user_id]);

            return query[0];
        }
        catch(err){
            console.log("Error in querying admin table")
            console.log(err)
        }
    },
    //-----------------------------------------------
    // APPLICATION
    //-----------------------------------------------
    approveApplication : async (user_id) => {
        try{
            const [query] = await pool.query(`
                SELECT * FROM admins
                WHERE user_id = ?
            `,[user_id]);

            return query[0];
        }
        catch(err){
            console.log("Error in approving application")
            console.log(err)
        }
    },
    denyApplication : async (user_id) => {
        try{
            const [query] = await pool.query(`
                SELECT * FROM admins
                WHERE user_id = ?
            `,[user_id]);

            return query[0];
        }
        catch(err){
            console.log("Error in denying application")
            console.log(err)
        }
    },
}
module.exports = adminDB