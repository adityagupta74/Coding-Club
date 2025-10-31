// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const isAdmin = require("../middleware/isAdmin");
const bcrypt = require("bcryptjs");

// list users (admin)
router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-passwordHash");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get single user
router.get("/:id", isAdmin, async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select("-passwordHash");
    res.json(u);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update role or info
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { role, name } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    if (role) user.role = role;
    if (name) user.name = name;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete user
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
