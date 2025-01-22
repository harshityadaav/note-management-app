const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Middleware to protect routes
 */
const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ error: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(401).json({ error: "Not authorized, invalid token" });
  }
};

module.exports = { authMiddleware };