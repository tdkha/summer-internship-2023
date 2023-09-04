const pdfController = require('../controller/pdfController');
const router = require('express').Router();

//--------------------------------------------
// routes importing
//--------------------------------------------
const studentRoute = require('./student');
const adminRoute = require('./admin');
const authRoute = require('./auth');
const authController = require('../controller/authController');
//--------------------------------------------
// sub-routes implementation
//--------------------------------------------
router.use('/student',studentRoute);
router.use('/admin',adminRoute);
router.use('/auth',authRoute);
//--------------------------------------------
// main routes implementation
//--------------------------------------------

module.exports = router;