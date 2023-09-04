//--------------------------------------------------------------
// Sub route of "API"
// path : /api/student/...
//--------------------------------------------------------------
const adminController = require('../controller/adminController');
const webContentController = require('../controller/webContentController');
const validateRole = require('../middleware/validateRole');
const unless = require('../middleware/unless')
const router = require('express').Router();
//-------------------------------------------------------------
// Middleware
//-------------------------------------------------------------
router.use(
    unless(
        ['/view-all-projects'],
        validateRole
    )
); 

router.get('/view-all-students',adminController.viewAllStudents);
router.get('/view-all-applications',adminController.viewStudentApplications);
router.get('/view-all-projects',webContentController.viewProjects);
router.get('/view-appplication-stats', adminController.viewStudentApplicationStats);

module.exports = router;