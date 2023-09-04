const webContentController = require('../controller/webContentController');

const router = require('express').Router();

router.get('/ongoing-projects',webContentController.viewProjects);
//router.get('/web-content/view-projects',webContentController.viewProjects);
router.get('/view-project-filter',webContentController.viewProjectFilterInfo);

module.exports = router;