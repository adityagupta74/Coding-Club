// routes/projects.js
const express = require("express");
const Project = require("../models/Project");
const isAdmin = require("../middleware/isAdmin");
const router = express.Router();

// ✅ Get all projects (Public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create project (Admin only)
router.post("/", isAdmin, async (req, res) => {
  try {
    const p = new Project(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Update project (Admin only)
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(p);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Delete project (Admin only)
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
