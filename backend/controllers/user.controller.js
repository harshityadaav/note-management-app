const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

/**
 * Sign up a new user
 */
const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    res.status(201).json({ message: "User created successfully" }); 
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Sign in a user
 */
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if the user is active
    if (user.status !== "active") {
      return res.status(403).json({ error: "Your account is not active. Please contact support." });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate token for active user
    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(400).json({ error: error.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // `req.user` contains the user ID from the token, added by the authenticate middleware
    const user = await User.findById(req.user.id).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user); // Respond with user details
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * Deactivate user by ID (Admin Only)
 */
const deactivateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.status = 'deactivated'; // Change the status to deactivated
    await user.save();

    res.status(200).json({ message: "User deactivated successfully", data: user });
  } catch (error) {
    console.error("Error deactivating user:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Activate user by ID (Admin Only)
 */
const activateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.status = 'active'; // Change the status to active
    await user.save();

    res.status(200).json({ message: "User activated successfully", data: user });
  } catch (error) {
    console.error("Error activating user:", error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  signup,
  signin,
  getAllUsers,
  deactivateUser,
  activateUser,
  getUserProfile
};