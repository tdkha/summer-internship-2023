const {pool,getConnection} = require('./connection');
const studentDB = require('./studentDB');

const projectDB = {
    selectProjectIdByName : async (project_name) => {
        try{
            const [connection] = await pool.query(`SELECT id from projects WHERE name = ?`,[project_name]);
            return connection[0];
        }catch(err){
            console.log("Error in <projects> table querying");
            console.log(err);
        }
    },
    //-----------------------------------
    // select duration of years for parsing data to the web content
    //-----------------------------------
    selectYear : async(past,current) =>{
        try{
            const [query] = await pool.query(`
                SELECT year(start_date) as "year" FROM projects
                WHERE year(start_date) >= ?
                and year(start_date) <= ?
                GROUP BY (year(start_date))
            
            `,[past, current]);
            return query;
        }catch(err){
            console.log("Error in <projects> table querying");
            console.log(err);
        }
    },
    //-----------------------------------
    // select fields for data filtering in the web content
    //-----------------------------------
    selectField : async () => {
        try{
            const [query] = await pool.query(`SELECT field FROM projects`);
            return query;
        }catch(err){
            console.log("Error in <projects> table querying");
            console.log(err);
        }
    },
    //-----------------------------------
    // Getting <name> and <field> using <year>
    //-----------------------------------
    selectProjectByYearAndField : async (props) => {
        const year = props.year || undefined;
        const field = props.field || undefined;
        if(year && !field){
            return new Promise( (resolve, reject) => {
                const query = pool.query(`
                    SELECT * FROM projects
                    WHERE year(start_date) = ? 
                    AND year(end_date) IS NULL;
                    `
                    
                , [year]);
                if(!query) return reject("Error in <projects> table querying")
                return resolve(query)
            });
        } else if ( year && field){
            return new Promise( (resolve, reject) => {
                const query = pool.query(`
                    SELECT name FROM projects
                    WHERE year(start_date) = ? 
                    AND field = ?
                    AND year(end_date) IS NULL;
                    `
                , [year,field]);
                if(!query) return reject("Error in <projects> table querying")
                return resolve(query)
            });
        }
        return null;
    },
    
    //-----------------------------------
    //  Getting <ALL> "INFORMATION" from projects registered by students regardless of <state> 
    //-----------------------------------
    selectProjectsByStudentID : async(student_id) => {
        try{
            const [connection] = await pool.execute(`
            SELECT * FROM projects
            WHERE id = (select project_id from student_projects
            where student_id = ?)
            `,[student_id])
            return connection
        }catch(err){
            console.log("Error in getting projects")
            console.log(err)
        } 
    },
    selectProjectNameByStudentID : async(student_id) => {
        try{
            const [connection] = await pool.query(`
            SELECT id,name FROM projects
            WHERE id IN (SELECT project_id FROM student_projects WHERE student_id = ?)
            `,[student_id])
            return connection
        }catch(err){
            console.log("Error in getting projects")
            console.log(err)
        } 
    },
    //-----------------------------------
    //  Getting finished <ALL> "INFORMATION" from projects registered by students regardless of <state> 
    //-----------------------------------
    selectFinishedProjectsByStudentID : async(student_id) => {
        try{
            const date = new Date()
            const year = date.getFullYear();
            const [connection] = await pool.query(`
            SELECT id, name FROM projects
                WHERE id IN (SELECT project_id FROM student_projects WHERE student_id = ? AND state = "finished")
                AND YEAR(start_date) = ?;
            `,[student_id,year])
            return connection
        }catch(err){
            console.log("Error in getting projects")
            console.log(err)
        } 
    },
    //-----------------------------------
    //  Inserting new projects belonging to a student
    //-----------------------------------
    insertProjectsByStudentID : async(student_id,projects) => {
        try{
            const constructingArray = async () => {
                const array = []
                const state = 'continued'
                for (const project of projects){
                    const {id} = await projectDB.selectProjectIdByName(project) 
                    const newProject = new Array(student_id,id,state);
                    array.push(newProject)
                }
                return array;
            }
            const valueArray = await constructingArray();

            // Bulk insert
            const [connection] = await pool.query(`
                INSERT INTO student_projects( student_id , project_id, state)
                VALUES ?
            `,[valueArray])
            return connection;
        }catch(err){
            console.log("Error in inserting projects")
            console.log(err)
        } 
    },
    //-----------------------------------
    //  Removing new projects belonging to a student
    //-----------------------------------
    removeProjectByStudentID : async(student_id,project) => {
        try{
            const [connection] = await pool.query(`
                DELETE FROM student_projects 
                    WHERE student_id = ?
                    AND project_id = (SELECT id from projects WHERE name = ?) 
              
            `,[student_id , project])
            return connection
        }catch(err){
            console.log("Error in removing projects")
            console.log(err)
        } 
    },
}

module.exports = projectDB