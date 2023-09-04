const applicationDB = require('../db/applicationDB');
const projectDB = require('../db/projectDB');
const studentDB = require('../db/studentDB');

const adminController = {
    //----------------------------------------------------------------
    // Student Information 
    //----------------------------------------------------------------
    viewAllStudents : async (req,res) => {
        try{
            const query = await studentDB.selectAllStudent();
            res.status(200).json(query);
        }catch(err){
            console.log("Error in studentController--viewAllStudent");
            res.status(500).send("Error")
        }
    },
    viewOneStudentInfo : async (req, res) => {
        try{
            const student_number = req.body.student_number;
            const query = await studentDB.selectOneStudent(student_number);
            res.status(200).json(query); 

        }catch(err){
            console.log("Error in studentController--viewOneStudent");
            res.status(500).send("Error")
        }
    },
    //----------------------------------------------------------------
    // Student Applications
    //----------------------------------------------------------------
    viewStudentApplications :  async (req, res) => {
        try{
            const query = await applicationDB.selectAllApplications();
            res.status(200).json(query); 

        }catch(err){
            res.status(500).json({message : "Failed to get student's applications"})
        }
    },
    viewStudentApplicationStats : async (req, res) => {
        try{
            const countAll = applicationDB.selectCountAllApplications();
            const countOutsider = applicationDB.selectCountOutsiders();
            const countInsider = applicationDB.selectCountInsiders();
            const query = await Promise.all([countAll , countOutsider , countInsider]);
            res.status(200).json(query); 

        }catch(err){
            res.status(500).json({message : "Failed to get student's applications"})
        }
    },
    //----------------------------------------------------------------
    // Project 
    //----------------------------------------------------------------
    addNewProjects : async (req, res) => {
        try{
            
            res.status(200).json(); 

        }catch(err){
            res.status(500).json({message : "Failed to add new applications"})
        }
    },
    editProjects : async (req, res) => {
        try{
            
            res.status(200).json(); 

        }catch(err){
            res.status(500).json({message : "Failed to edit applications"})
        }
    },
    deleteProjects : async (req, res) => {
        try{
            
            res.status(200).json(); 

        }catch(err){
            res.status(500).json({message : "Failed to delete applications"})
        }
    },

}
module.exports = adminController;