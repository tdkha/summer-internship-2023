
//--------------------------------------------------------------
// Sub route of "API"
// path : /api/auth/...
//--------------------------------------------------------------
const authController = require('../controller/authController');
const validateInfoSufficiency = require('../middleware/validateInfoSufficiency');
const router = require('express').Router();

router.post('/register',validateInfoSufficiency,authController.registerUser);
router.post('/login',authController.loginUser);
router.get('/persist-login',authController.persistLogin);
router.get('/logout',authController.logOut);
module.exports = router;