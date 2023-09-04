
const {pool,getConnection} = require('./connection');

const studentDB = {
    selectStudentID: async(user_id) => {
        try{
            const [connection] = await pool.query(`
                SELECT id from students WHERE user_id = ?
            `,[user_id])
            return connection[0]
        }catch(err){
            console.log("Error in certiDB selecting student id");
            console.log(err)
        } 
    },
    selectStudentName: async(user_id) => {
        try{
            const [connection] = await pool.query(`
                SELECT firstname, lastname from students WHERE user_id = ?
            `,[user_id])
            return connection[0]
        }catch(err){
            console.log("Error in certiDB selecting student id");
            console.log(err)
        } 
    },
    selectAllStudent: async() => {
        try{
            const [connection] = await pool.execute(
                'SELECT student_number , firstname , lastname, phone, email, address FROM students'
            )
            return connection;
        }catch(err){
            console.log("Error in student table querrying");
            console.log(err)
        }
    },
    selectOneStudent: async(user_id) => {
        try{
            const [connection] = await pool.query(
                `SELECT *
                    FROM students
                    WHERE user_id = ?
                `
            ,[user_id])
            return connection[0];
        }catch(err){
            console.log("Error in student table querrying");
            console.log(err)
        }
    },
    //-*------------------------------------------------*-
    // <INSERT> to students TABLE
    //-*------------------------------------------------*-
    insertNewStudent : async(student_number,firstname,lastname,phone,email,address) =>{
        try{
            const connection = await pool.query(
                `INSERT INTO students(student_number ,firstname ,lastname ,phone ,email ,address)
                    VALUES(?,?,?,?,?,?)
                `
                ,[student_number,firstname,lastname,phone,email,address]
                
            );
            return connection;
        }catch(err){
            console.log("Error in users table querrying");
            console.log(err);
        }
    },
    deleteUser : async (student_number) =>{
        try{
            const connection = await pool.query(
                `DELETE FROM students
                    WHERE student_number = ?
                `
                ,[student_number]
                
            );
            return connection;
        }catch(err){
            console.log("Error in student table querrying");
            console.log(err);
        }
    },
    selectStudentNumber: async(student_number) => {
        try{
            const [connection] = await pool.query(`
                SELECT student_number from students WHERE student_number = ?
            `,[student_number])
            return connection[0]
        }catch(err){
            console.log("Error in validating student_number ");
            console.log(err)
        } 
    },
    selectEmail: async(email) => {
        try{
            const [connection] = await pool.query(`
                SELECT email from students WHERE email = ?
            `,[email])
            return connection[0]
        }catch(err){
            console.log("Error in validating email ");
            console.log(err)
        } 
    },
    selectPhone: async(phone) => {
        try{
            const [connection] = await pool.query(`
                SELECT phone from students WHERE phone = ?
            `,[phone])
            return connection[0]
        }catch(err){
            console.log("Error in validating phone ");
            console.log(err)
        } 
    },

};

module.exports = studentDB