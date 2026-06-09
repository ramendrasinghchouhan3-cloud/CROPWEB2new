const express = require("express");

const router = express.Router();

const {

    addFarmer,

    getFarmers

} = require("../controllers/farmerController");

router.post("/addFarmer", addFarmer);

router.get("/getFarmers", getFarmers);

module.exports = router;