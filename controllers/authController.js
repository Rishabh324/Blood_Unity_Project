const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(200).json({
                status: "failed",
                message: "user already exists"
            })
        }
        else {
            //password hashing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            req.body.password = hashedPassword;

            //user creation
            const newUser = await userModel.create(req.body);
            res.status(201).json({
                status: "Success",
                message: "User Created",
                data: newUser
            })
        }
    }
    catch (err) {
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at Register API",
            err
        })
    }
}

exports.loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                status: "Failed",
                message: "User does not exist."
            })
        }

        if (user.role !== req.body.role) {
            return res.status(500).json({
                status: "Failed",
                message: "Role does not match."
            })
        }

        //compare password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(500).json({
                status: "Failed",
                message: "Invalid Credentials"
            })
        }
        else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "12h" });
            res.status(200).json({
                status: "Success",
                message: "User logged in.",
                data: user,
                token
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            status: "Process Terminated",
            message: "Failed at Login API",
            err
        })
    }
}

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.id });
        res.status(200).json({
            status: "Success",
            message: "User fetched successfully.",
            user
        })
    }
    catch (err) {
        res.status(500).json({
            status: "Failed",
            message: "Unable to get current user."
        })
    }
}