const { pool, getConnection } = require("./connection");

const  certiDB  = {
    getCertiInfo : async (student_id) => {
        try{
            const [query] = await pool.query(`
                SELECT feedback , issued_by from certificates
                WHERE student_id = ?
            `,[student_id]);
            return query[0];
        }
        catch(err){
            console.log("Error in querying certi table")
            console.log(err)
        }
    },
    selectCerti : async (student_id) => {
        try{
            const [query] = await pool.execute(`
                SELECT * from certificates WHERE student_id = ?
            `,[student_id]);
            return query;
        }
        catch(err){
            console.log("Error in selecting certi table")
        }
    },
    selectCertiOnDate : async (student_id,date) => {
        try{
            const [query] = await pool.execute(`
                SELECT * from certificates 
                WHERE student_id = ?
                AND issued_date =?
            `,[student_id,date]);
            return query;
        }
        catch(err){
            console.log("Error in selecting certi table")
        }
    },
    insertCerti : async (filename,pdf,date,student_id) => {
        try{
            const [query] = await pool.query(`
                INSERT INTO certificates(filename, pdf, issued_date,student_id) VALUES(?,?,?,?)
            `,[filename,pdf,date,student_id]);
            return query[0];
        }
        catch(err){
            console.log("Error in inserting certi table")
            console.log(err)
        }
    },
    updateCerti : async (filename,pdf, date,student_id) => {
        try{
            const [query] = await pool.query(`
                UPDATE certificates
                SET filename = ? , pdf = ?
                WHERE student_id = ?
                AND issued_date = ?
            `,[filename, pdf , student_id,date]);
            return query[0];
        }
        catch(err){
            console.log("Error in querying certi table")
            console.log(err)
        }
    },
    selectFile : async (filename,student_id) => {
        try{
            const [query] = await pool.query(`
                SELECT pdf from certificates
                WHERE filename = ?
                AND student_id = ?
            `,[filename, student_id]);
            return query[0];
        }
        catch(err){
            console.log("Error in getting file in certi table")
            console.log(err)
        }
    },
}

module.exports = certiDB