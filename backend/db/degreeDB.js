const {pool,getConnection} = require('./connection');

const degreeDB = {
    selectDegreeID : async (degree_programme) => {
        try {
            const [connection] = await pool.query(`SELECT id FROM degree WHERE degree_programme = ?`,[degree_programme]);
            return connection[0]
        }catch(err){
            console.log("Error in Degree table querying");
            console.log(err);
        }
    },
    insertStudentDegree : async (student_number , degree_id) => {
        try {
            const [connection] = await pool.query(`INSERT INTO student_degree VALUES( (SELECT id from students WHERE student_number = ?) ,?)`,[student_number,degree_id]);
            return connection[0]
        }catch(err){
            console.log("Error in Degree table querying");
            console.log(err);
        }
    },
}

module.exports = degreeDB