const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    village: {
        type: String,
        required: true
    },

    landArea: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model(
    "Farmer",
    farmerSchema
);