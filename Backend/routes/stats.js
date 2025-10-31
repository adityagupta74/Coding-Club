const express = require("express");
const auth = require("../middleware/auth");
const Stats = require("../models/Stats");
const router = express.Router();
const isAdmin = require("../middleware/isAdmin");

// Get user stats
router.get("/activity", auth, async (req, res) => {
  try {
    const stats = await Stats.findOne({ userId: req.user.id });
    if (!stats) return res.status(404).json({ message: "Stats not found" });
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update or create stats
router.post("/update", auth, async (req, res) => {
  try {
    const { eventsJoined, projects, badges, globalRank, streak, score } =
      req.body;
    let stats = await Stats.findOne({ userId: req.user.id });

    if (stats) {
      stats.eventsJoined = eventsJoined ?? stats.eventsJoined;
      stats.projects = projects ?? stats.projects;
      stats.badges = badges ?? stats.badges;
      stats.globalRank = globalRank ?? stats.globalRank;
      stats.streak = streak ?? stats.streak;
      stats.score = score ?? stats.score;
      await stats.save();
    } else {
      stats = await Stats.create({ userId: req.user.id, ...req.body });
    }

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/global", async (req, res) => {
  try {
    const s = await Stats.findOne();
    res.json(s || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// admin update/create global
router.post("/global", isAdmin, async (req, res) => {
  try {
    let s = await Stats.findOne();
    if (s) {
      Object.assign(s, req.body, { updatedAt: new Date() });
      await s.save();
    } else {
      s = new Stats(req.body);
      await s.save();
    }
    res.json(s);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
