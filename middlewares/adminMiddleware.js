const userModel = require("../models/userModel");

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.body.id);
        if (user?.role !== "Admin") {
            return res.status(401).json({
                status: "false",
                message: "Admin auth failed"
            })
        }
        else next();
    }
    catch (err) {
        res.status(401).json({
            status: "failed",
            message: "Error at adminMiddlware."
        })
    }
}