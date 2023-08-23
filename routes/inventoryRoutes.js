const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const inventoryController = require("../controllers/inventoryController");
const router = express.Router();

router
    .route('/add-inventory')
    .post(authMiddleware, inventoryController.addInventory);

router
    .route('/getBloodRecords')
    .get(authMiddleware, inventoryController.getInventory);

router
    .route('/getRecentInventory')
    .get(authMiddleware, inventoryController.getRecentInventory);

router
    .route('/getBloodRecordsHospital')
    .post(authMiddleware, inventoryController.getInventoryHospital);


router
    .route('/getDonorRecords')
    .get(authMiddleware, inventoryController.getDonorRecords);

router
    .route('/getHospitalRecords')
    .get(authMiddleware, inventoryController.getHospitalRecords);

router
    .route('/getOrganisationRecords')
    .get(authMiddleware, inventoryController.getOrganisationRecords);

router
    .route('/getOrganisationRecordsHospital')
    .get(authMiddleware, inventoryController.getOrganisationRecordsHospital);

module.exports = router;