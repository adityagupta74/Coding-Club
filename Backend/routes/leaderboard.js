const express = require("express");
const LeaderboardEntry = require("../models/LeaderboardEntry");
const auth = require("../middleware/auth");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");

router.get("/", async (req, res) => {
  const list = await LeaderboardEntry.find().sort({ score: -1 });
  res.json(list);
});

router.post("/", auth, async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.json(entry);
});

router.delete("/:id", auth, async (req, res) => {
  await LeaderboardEntry.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

router.get("/", async (req, res) => {
  try {
    const list = await LeaderboardEntry.find().sort({ score: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// admin create
router.post("/", isAdmin, async (req, res) => {
  try {
    const entry = new LeaderboardEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// admin update score/rank
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const entry = await LeaderboardEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(entry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// admin delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await LeaderboardEntry.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
