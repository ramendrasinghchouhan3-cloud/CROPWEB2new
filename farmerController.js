const Farmer = require("../models/Farmer");

/* =========================
   ADD FARMER
========================= */

const addFarmer = async (req, res) => {

    try {

        const newFarmer = new Farmer({

            name: req.body.name,

            mobile: req.body.mobile,

            village: req.body.village,

            landArea: req.body.landArea

        });

        await newFarmer.save();

        res.status(201).json({

            success: true,

            message: "Farmer added successfully",

            data: newFarmer

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error",

            error: error.message

        });

    }
};

/* =========================
   GET FARMERS
========================= */

const getFarmers = async (req, res) => {

    try {

        const farmers = await Farmer.find();

        res.status(200).json({

            success: true,

            count: farmers.length,

            data: farmers

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

    addFarmer,

    getFarmers

};