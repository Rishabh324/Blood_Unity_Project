const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

exports.getDonorList = async (req, res) => {
    try {
        const donorData = await userModel.find({ role: "Donor" }).sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            totalCount: donorData.length,
            message: "Donor List Fetched Successfully.",
            donorData
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "false",
            message: "Error in donor list API."
        })
    }
}

exports.getHospitalList = async (req, res) => {
    try {
        const hospitalData = await userModel.find({ role: "Hospital" }).sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            totalCount: hospitalData.length,
            message: "Hospital List Fetched Successfully.",
            hospitalData
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "false",
            message: "Error in hospital list API."
        })
    }
}

exports.getOrganisationList = async (req, res) => {
    try {
        const organisationData = await userModel.find({ role: "Organisation" }).sort({ createdAt: -1 });
        res.status(200).json({
            status: "success",
            totalCount: organisationData.length,
            message: "Organisation List Fetched Successfully.",
            organisationData
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "false",
            message: "Error in organisation list API."
        })
    }
}

exports.deleteDonor = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Donor Deleted Successfully."
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "false",
            message: "Error in delete donar API."
        })
    }
}

exports.deleteHospital = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Hospital Deleted Successfully."
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "false",
            message: "Error in delete donar API."
        })
    }
}

exports.deleteOrganisation = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            message: "Organisation Deleted Successfully."
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "false",
            message: "Error in delete donar API."
        })
    }
}

exports.getAllRecords = async (req, res) => {
    try {
        const inventory = await inventoryModel.find().sort({ createdAt: -1 });
        console.log(inventory);
        res.status(200).json({
            status: "success",
            message: "All records fetched successfully.",
            inventory
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "Error in get all records API."
        })
    }
}