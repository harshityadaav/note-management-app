const express = require("express");
const { signup, signin, getAllUsers, deactivateUser, activateUser, getUserProfile } = require("../controllers/user.controller");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);

router.get("/profile", authMiddleware, getUserProfile);

// Get all users route (Admin Only)
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

// Deactivate user route (Admin Only)
router.patch('/:id/deactivate', authMiddleware, adminMiddleware, deactivateUser);

// Activate user route (Admin Only)
router.patch('/:id/activate', authMiddleware, adminMiddleware, activateUser);

module.exports = router;