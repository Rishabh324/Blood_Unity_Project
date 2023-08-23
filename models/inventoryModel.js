const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    inventoryType: {
        type: String,
        required: [true, "Inventory type required"],
        enum: ["IN", "OUT"]
    },
    bloodGroup: {
        type: String,
        required: [true, "Blood group required"],
        enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
    },
    email: {
        type: String,
        required: [true, "Donor email is required."]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity required"],
    },
    organisation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, "Organisation required"]
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventoryType === 'OUT'
        }
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: function () {
            return this.inventoryType === 'IN'
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('inventory', inventorySchema);