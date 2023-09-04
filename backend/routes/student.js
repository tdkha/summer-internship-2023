
//--------------------------------------------------------------
// Sub route of "API"
// path : /api/student/...
//--------------------------------------------------------------
const validateRole = require('../middleware/validateRole');
const pdfController = require('../controller/pdfController');
const studentController = require('../controller/studentController');
const router = require('express').Router();

//-------------------------------------------------------------
// Middleware
//-------------------------------------------------------------
router.use(validateRole); 
//-------------------------------------------------------------
// GET Method
//-------------------------------------------------------------
//------------------------CERTIFICATE-------------------------------------
router.get('/order-certificate',pdfController.generatePDF);
router.get('/get-certificate',pdfController.getPDF);
router.get('/get-certificate/:filename', pdfController.getPDF);
//------------------------PROJECT-------------------------------------
router.get('/registered-projects',studentController.getRegisteredProjects);
router.get('/completed-projects',studentController.getCompletedProjects);

//-------------------------------------------------------------
// POST Method
//-------------------------------------------------------------
router.post('/add-projects',studentController.addProjects);
router.post('/remove-project',studentController.removeProject);
module.exports = router;