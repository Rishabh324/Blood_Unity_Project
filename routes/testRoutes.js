const express = require("express");
const testController = require('../controllers/testController');
//const router
const router = express.Router();

//routes
router
    .route('/test')
    .get(testController.getTest);

module.exports = router;