const projectDB = require("../db/projectDB");

const webContentController = {
    viewProjects : async ( req, res ) => {
        const year = req.query.year; // must include year
        const field = req.query.field = undefined;
        const queryVar = {
            year : year,
            field : field
        }
        if(!year) return res.status(403).json("Request denied due to lack of info");
        try{
            const [query] = await projectDB.selectProjectByYearAndField(queryVar);
            res.status(200).json(query)
        }catch(err){
            console.log("Error in view projects");
            res.status(500).send("Error")
        }
    },
    viewProjectFilterInfo : async ( req , res ) => {
        const field = req.query.field;
        const query = await projectDB.selectField();
        res.status(200).json(query)
    }
    

}
module.exports = webContentController;