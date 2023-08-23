const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        required: [true, "Role is required"],
        enum: ['Admin', 'Organisation', 'Donor', 'Hospital']
    },
    name: {
        type: String,
        required: function () {
            return (this.role === 'Admin' || this.role === 'Donor');
        }
    },
    organisationName: {
        type: String,
        required: function () {
            return this.role === 'Organisation';
        }
    },
    hospitalName: {
        type: String,
        required: function () {
            return this.role === 'Hospital';
        }
    },
    email: {
        type: String,
        required: [true, "An email must be there."],
        unique: true
    },
    password: {
        type: String,
        required: [true, "An password must be there."],
    },
    website: String,
    address: {
        type: String,
        required: "Address is required."
    },
    phone: {
        type: String,
        required: [true, "Phone number is required."]
    },

}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);