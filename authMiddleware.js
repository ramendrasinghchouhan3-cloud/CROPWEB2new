const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;

    // Check karo kya request ke headers mein token aaya hai
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // "Bearer TOKEN_VALUE" mein se token alag karo
            token = req.headers.authorization.split(" ")[1];

            // Token ko decode karo (Aapke authController mein "secretkey" use hua hai)
            const decoded = jwt.verify(token, "secretkey");

            // Logged-in user ki ID ko req.user mein daal do
            req.user = { id: decoded.id };

            next(); // Agle function (Controller) par bhejo
        } catch (error) {
            return res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Not authorized, no token found" });
    }
};

module.exports = { protect };