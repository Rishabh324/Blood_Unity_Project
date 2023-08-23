const { default: mongoose } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

const bloodDataController = async (req, res) => {
    try {
        const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
        const bloodData = [];
        const organisation = new mongoose.Types.ObjectId(req.body.id);

        await Promise.all(bloodGroups.map(async (bloodGroup) => {

            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: "IN",
                        organisation,
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    }
                }
            ])

            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: "OUT",
                        organisation,
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: "$quantity" },
                    }
                }
            ])

            const bloodAvailable = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            bloodData.push({
                bloodGroup,
                totalIn: (totalIn[0]?.total || 0),
                totalOut: (totalOut[0]?.total || 0),
                bloodAvailable
            })
        }));
        res.status(200).json({
            status: "success",
            message: "Blood Data fetched successfully.",
            bloodData
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "Error in bloodDataController API."
        })
    }
}

module.exports = { bloodDataController };