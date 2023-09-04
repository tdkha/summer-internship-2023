const { pool, getConnection } = require("./connection");

const  applicationDB  = {
    selectAllApplications : async () => {
        try{
            const [query] = await pool.execute(`SELECT id, firstname , lastname , student_number, email, phone, address, applied_date  from applications ORDER BY applied_date`)
            return query;
        }catch(err){
            console.log("Error in select all applications")
        }
    },
    selectCountAllApplications : async () => {
        try{
            const [query] = await pool.query(`SELECT COUNT(*) AS 'countAll' from applications WHERE state = 'pending'`)
            return query[0];
        }catch(err){
            console.log("Error in select all applications")
        }
    },
    selectCountOutsiders : async () => {
        try{
            const [query] = await pool.query(`SELECT COUNT(*) AS 'countOutsider' from applications WHERE student_number IS NULL`)
            return query[0];
        }catch(err){
            console.log("Error in select all applications of outsiders")
        }
    },
    selectCountInsiders : async () => {
        try{
            const [query] = await pool.query(`SELECT COUNT(*) AS 'countInsider' from applications WHERE student_number IS NOT NULL`)
            return query[0];
        }catch(err){
            console.log("Error in select all applications of insiders")
        }
    },
    insertApplication : async (firstname , lastname , student_number, email, phone, address , username, password) => {
        try{
            const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
            if(student_number){
                
                const [query] = await pool.query(`
                    INSERT INTO applications(firstname ,lastname , student_number, email , phone, address , username, password ,applied_date)
                        VALUES (? , ? ,? ,? ,? ,? ,? ,?,?)
                    `,[firstname , lastname ,student_number , email , phone, address, username, password, date]);
                return query[0];
            }else{
                const [query] = await pool.query(`
                    INSERT INTO applications(firstname ,lastname , email , phone, address , username, password , applied_date )
                        VALUES (? , ? ,? ,? ,? ,? ,?,?)
                    `,[firstname , lastname , email , phone, address, username, password , date]);
                return query[0];
            }
        }
        catch(err){
            console.log("Error in inserting in applications table")
            console.log(err)
        }
    },
    selectUserName : async(username) => {
        try{
            const [query] = await pool.query(`
            SELECT username from applications WHERE username = ?
            `,[ username]);
             return query[0];        
        }catch(err){
            console.log('Error in validating username uniqueness of application info');
        }
    },
    selectStudentNumber : async(student_number) => {
        try{
            const [query] = await pool.query(`
            SELECT student_number from applications WHERE student_number = ?
            `,[ student_number]);
             return query[0];        
        }catch(err){
            console.log('Error in validating student_number uniqueness of application info');
        }
    },
    selectEmail :  async(email) => {
        try{
            const [query] = await pool.query(`
            SELECT email from applications WHERE email = ?
            `,[ email]);
             return query[0];        
        }catch(err){
            console.log('Error in validating email uniqueness of application info');
        }
    },
    selectPhone :  async(phone) => {
        try{
            const [query] = await pool.query(`
            SELECT phone from applications WHERE phone = ?
            `,[ phone]);
             return query[0];        
        }catch(err){
            console.log('Error in validating phone uniqueness of application info');
        }
    },
}

module.exports = applicationDB