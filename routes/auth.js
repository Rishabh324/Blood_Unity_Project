const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require("../middlewares/authMiddleware");
//routes
router
    .route('/register')
    .post(authController.registerController);

router
    .route('/login')
    .post(authController.loginController);

router
    .route('/currentUser')
    .get(authMiddleware, authController.getCurrentUser);

module.exports = router;