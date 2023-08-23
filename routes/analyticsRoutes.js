const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const analyticsController = require("../controllers/analyticsController");
const router = express.Router();

router
    .route('/bloodData')
    .get(authMiddleware, analyticsController.bloodDataController);

module.exports = router;