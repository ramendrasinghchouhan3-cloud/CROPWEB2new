const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   1. REGISTER USER
========================= */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            message: "Registration successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

/* =========================
   2. LOGIN USER
========================= */
/* =========================
   2. LOGIN USER (Updated with Photo Support)
========================= */
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "7d" }
        );

        // 🔥 SABSE ZAROORI: Login karte waqt database se profileImage utha kar frontend ko bhejna
        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                contactNo: user.contactNo || "",
                address: user.address || "",
                profileImage: user.profileImage || "", // <-- Check karo ye line hai ya nahi!
                totalLand: user.totalLand ?? 2.4, 
                district: user.district || "Ujjain" 
            }
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
/* =========================
   3. 🔥 PROFILE UPDATE CONTROLLER (With Photo Upload)
========================= */
const updateProfile = async (req, res) => {
    try {
        const { userId, name, contactNo, address, totalLand, district } = req.body;

        // Jo fields update karni hain unka object
        let updateData = {
            name,
            contactNo,
            address,
            totalLand: Number(totalLand) || 2.4,
            district
        };

        // 📸 Agar user ne koi photo select karke bheji hai toh url banao
        if (req.file) {
            updateData.profileImage = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { returnDocument: 'after' } // Mongoose warning hatane ke liye 'new: true' ki jagah ye best hai
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User nahi mila!" });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully!",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                contactNo: updatedUser.contactNo || "",
                address: updatedUser.address || "",
                profileImage: updatedUser.profileImage || "", 
                totalLand: updatedUser.totalLand ?? 2.4,
                district: updatedUser.district || "Ujjain"
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/* =========================
   4. 🔒 PASSWORD UPDATE CONTROLLER
========================= */
const changePassword = async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User nahi mila!" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false, 
                message: "Galat hai bhai! Purana password sahi nahi hai." 
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "🎉 Password ekdum kamal tarike se badal gaya hai!"
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/* =========================
   5. 🔍 REAL-TIME PASSWORD VERIFICATION
========================= */
const verifyCurrentPassword = async (req, res) => {
    try {
        const { userId, currentPassword } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User nahi mila!" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(200).json({ success: false, message: "❌ Galat password hai bhai! Sahi password dalo." });
        }

        res.status(200).json({ success: true, message: "✅ Sahi password hai." });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Saare functions ko export kar rahe hain (Single copy)
module.exports = {
    registerUser,
    loginUser,
    updateProfile,
    changePassword,
    verifyCurrentPassword
};