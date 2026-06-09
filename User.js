const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // 🔥 YAHAN SE HUM NAYI FIELDS ADD KAR RAHE HAIN
    contactNo: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    profileImage: {
        type: String, 
        default: "" // Isme uploaded photo ka path save hoga
    },
    totalLand: {
        type: Number,
        default: 2.4 // Tumhari zameen ka default size permanently set
    },
    district: {
        type: String,
        default: "Ujjain" // Tumhara default zilla permanently set
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);