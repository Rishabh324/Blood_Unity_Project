const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');
const adminMiddleware = require("../middlewares/adminMiddleware");

router
    .route("/")
    .get(authMiddleware, adminMiddleware, adminController.getAllRecords);

router
    .route("/donor-list")
    .get(authMiddleware, adminMiddleware, adminController.getDonorList);

router
    .route("/hospital-list")
    .get(authMiddleware, adminMiddleware, adminController.getHospitalList);

router
    .route("/organisation-list")
    .get(authMiddleware, adminMiddleware, adminController.getOrganisationList);

router
    .route("/delete-donor/:id")
    .delete(authMiddleware, adminMiddleware, adminController.deleteDonor);

router
    .route("/delete-hospital/:id")
    .delete(authMiddleware, adminMiddleware, adminController.deleteHospital);

router
    .route("/delete-organisation/:id")
    .delete(authMiddleware, adminMiddleware, adminController.deleteOrganisation);

module.exports = router;