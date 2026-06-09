const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
    registerUser,
    loginUser,
    updateProfile,
    changePassword,
    verifyCurrentPassword
} = require("../controllers/authController");

// 📸 MULTER CONFIGURATION: Photo kahan aur kaise save hogi
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Ye aapke server ke uploads folder me jayega
    },
    filename: function (req, file, cb) {
        // Naya naam: user_id + file extension (jaise .jpg)
        cb(null, "profile_" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 BADLAV HERE: update-profile me upload.single("profileImage") jodh diya hai
router.put("/update-profile", upload.single("profileImage"), updateProfile);

router.put("/change-password", changePassword);
router.post("/verify-password", verifyCurrentPassword);

module.exports = router;