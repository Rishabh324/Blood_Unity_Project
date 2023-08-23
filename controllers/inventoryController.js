const { default: mongoose } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel")

exports.addInventory = async (req, res) => {
    try {
        delete req.body.id;
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            })
        }
        else {
            // if (inventoryType === 'IN' && user.role !== 'Donor') {
            //     return res.status(404).json({
            //         status: "failed",
            //         message: "Not a donor account"
            //     })
            // }
            // if (inventoryType === 'OUT' && user.role !== 'Hospital') {
            //     return res.status(404).json({
            //         status: "failed",
            //         message: "Not a hospital"
            //     })
            // }

            if (req.body.inventoryType === "OUT") {
                const reqBloodGroup = req.body.bloodGroup;
                const reqQuantity = req.body.quantity;
                const organisation = new mongoose.Types.ObjectId(req.body.organisation);

                //calculate blood qty
                const totalInBlood = await inventoryModel.aggregate([
                    {
                        $match: {
                            organisation,
                            inventoryType: "IN",
                            bloodGroup: reqBloodGroup,
                        }
                    },
                    {
                        $group: {
                            _id: "$bloodGroup",
                            total: { $sum: "$quantity" }
                        }
                    }

                ]);
                const totalIn = totalInBlood[0]?.total || 0;

                const totalOutBlood = await inventoryModel.aggregate([
                    {
                        $match: {
                            organisation,
                            inventoryType: "OUT",
                            bloodGroup: reqBloodGroup,
                        }
                    },
                    {
                        $group: {
                            _id: "$bloodGroup",
                            total: { $sum: "$quantity" }
                        }
                    }
                ])
                const totalOut = totalOutBlood[0]?.total || 0;

                //calcs
                const availableBlood = totalIn - totalOut;
                if (availableBlood < reqQuantity) {
                    return res.status(404).json({
                        status: "failed",
                        message: "Not enough blood available"
                    })
                }
                req.body.hospital = user?._id;
            }
            else {
                req.body.donor = user?._id;
            }

            const inventory = await inventoryModel.create(req.body);
            return res.status(200).send({
                status: "Success",
                message: "New Blood record added.",
                inventory
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "Error in add inventory API."
        })
    }
}

exports.getInventory = async (req, res) => {
    try {
        console.log(req.body);
        const inventory = await inventoryModel.find({ organisation: req.body.id })
            .populate("donor")
            .populate("hospital");
        res.status(200).json({
            status: "success",
            message: "Blood records fetched.",
            inventory
        })
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Error at get inventory API."
        })
    }
}

exports.getInventoryHospital = async (req, res) => {
    try {
        const inventory = await inventoryModel.find(req.body.filters)
            .populate("donor")
            .populate("hospital")
            .populate("organisation")
            .sort({ createdAt: -1 });
        ;
        res.status(200).json({
            status: "success",
            message: "Hospital Consumer Blood records fetched.",
            inventory
        })
    }
    catch (err) {
        res.status(404).json({
            status: "failed",
            message: "Error at get consumer inventory API."
        })
    }
}

exports.getRecentInventory = async (req, res) => {
    try{
        const inventory = await inventoryModel.find({
            organisation: req.body.id
        }).limit(3).sort({createdAt:-1});
        res.status(200).json({
            status: "success",
            message: "Recent records fetched successfully.",
            inventory
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "Error in recent inventory API."
        })
    }
}

exports.getDonorRecords = async (req, res) => {
    try {
        const organisation = req.body.id;
        const donorId = await inventoryModel.distinct("donor", { organisation });
        const donors = await userModel.find({ _id: { $in: donorId } });
        res.status(200).json({
            status: "Success",
            message: "Donor records fetched.",
            donors
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Failed",
            message: "Error at getDonorRecords API."
        })
    }
}

exports.getHospitalRecords = async (req, res) => {
    try {
        const organisation = req.body.id;
        console.log(organisation);
        const hospitalId = await inventoryModel.distinct("donor", { organisation });
        const hospitals = await userModel.find({ _id: { $in: hospitalId } });
        res.status(200).json({
            status: "Success",
            message: "Hospital records fetched.",
            hospitals
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Failed",
            message: "Error at getHospitalRecords API."
        })
    }
}

exports.getOrganisationRecords = async (req, res) => {
    try {
        const donor = req.body.id;
        const organisationId = await inventoryModel.distinct("organisation", { donor });
        const organisations = await userModel.find({ _id: { $in: organisationId } });
        res.status(200).json({
            status: "Success",
            message: "Organisation records fetched.",
            organisations
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Failed",
            message: "Error at getOrganisationRecords API"
        })
    }
}

exports.getOrganisationRecordsHospital = async (req, res) => {
    try {
        const hospital = req.body.id;
        const organisationId = await inventoryModel.distinct("hospital", { hospital });
        const organisations = await userModel.find({ _id: { $in: organisationId } });
        res.status(200).json({
            status: "Success",
            message: "Hospital Organisation records fetched.",
            organisations
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "Failed",
            message: "Error at getOrganisationRecordsHospital API"
        })
    }
}