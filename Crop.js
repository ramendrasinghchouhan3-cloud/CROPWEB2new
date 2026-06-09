const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
    // 🌟 YEH LINE SABSE ZAROORI HAI: Yeh crop ko logged-in user se connect karegi
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    farmerName: {
        type: String,
        required: true
    },
    season: {
        type: String,
        required: true
    },
    landArea: {
        type: Number,
        required: true
    },
    production: {
        type: Number,
        required: true
    },
    fertilizerUsed: {
        type: String
    },
    investment: {
        type: Number
    },
    revenue: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Crop", cropSchema);