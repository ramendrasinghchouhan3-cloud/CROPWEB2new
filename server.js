//cd server
//node server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path"); 

const connectDB = require("./config/db");

const cropRoutes = require("./routes/cropRoutes");
const farmerRoutes = require("./routes/farmerRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

connectDB();

const app = express();

// 🔥 CORS FIXED: Live server ports ko strict permission de di hai bhai!
app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

// 📸 Uploads folder static server path setup
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/crops", cropRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {    
    res.send(
        "Crop History Management Backend Running..."
    );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});