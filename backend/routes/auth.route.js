const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");

const router = express.Router();

// Authentication routes
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;