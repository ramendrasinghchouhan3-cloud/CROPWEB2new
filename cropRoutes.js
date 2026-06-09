const express = require("express");
const router = express.Router();

const {
    addCrop,
    getAllCrops,
    deleteCrop,
    updateCrop
} = require("../controllers/cropController");

// 🌟 Security Guard (Middleware) ko import karo
const { protect } = require("../middleware/authMiddleware");

// 🌟 Ab saare routes ke beech mein 'protect' laga do
router.post("/addCrop", protect, addCrop);
router.get("/getCrops", protect, getAllCrops);
router.delete("/deleteCrop/:id", protect, deleteCrop);
router.put("/updateCrop/:id", protect, updateCrop);

module.exports = router;