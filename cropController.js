const Crop = require("../models/Crop");

// 1. ADD CROP (Sirf apne account mein jodne ke liye)
const addCrop = async (req, res) => {
    try {
        const newCrop = new Crop({
            user: req.user.id, // 🌟 Token se aayi hui logged-in user ki ID
            cropName: req.body.cropName,
            farmerName: req.body.farmerName,
            season: req.body.season,
            landArea: req.body.landArea,
            production: req.body.production,
            fertilizerUsed: req.body.fertilizerUsed,
            investment: req.body.investment,
            revenue: req.body.revenue
        });

        await newCrop.save();

        res.status(201).json({
            success: true,
            message: "Crop added successfully",
            data: newCrop
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// 2. GET ALL CROPS (Sirf LOGGED-IN user ke crops dikhane ke liye)
const getAllCrops = async (req, res) => {
    try {
        // 🌟 Crop.find() ke andar { user: req.user.id } laga diya taaki sabka data na aaye!
        const crops = await Crop.find({ user: req.user.id });

        res.status(200).json({
            success: true,
            count: crops.length,
            data: crops
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// 3. DELETE CROP (Sirf apna crop delete karne ke liye)
const deleteCrop = async (req, res) => {
    try {
        // 🌟 Check karo ki kya ye crop isi user ka hai?
        const crop = await Crop.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!crop) {
            return res.status(444).json({
                success: false,
                message: "Crop not found or you are not authorized to delete it"
            });
        }

        res.status(200).json({
            success: true,
            message: "Crop deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

// 4. UPDATE CROP (Sirf apna crop update karne ke liye)
const updateCrop = async (req, res) => {
    try {
        // 🌟 Check karo ki kya crop isi user ka hai tabhi update karo
        const updatedCrop = await Crop.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCrop) {
            return res.status(404).json({
                success: false,
                message: "Crop not found or you are not authorized to update it"
            });
        }

        res.status(200).json({
            success: true,
            message: "Crop updated successfully",
            data: updatedCrop
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    addCrop,
    getAllCrops,
    deleteCrop,
    updateCrop
};