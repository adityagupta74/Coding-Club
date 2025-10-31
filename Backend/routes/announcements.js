const express = require("express");
const Announcement = require("../models/Announcement.js");
const auth = require("../middleware/auth.js");
const isAdmin = require("../middleware/isAdmin");


const router = express.Router();

// list (public)
router.get("/", async (req, res) => {
  const list = await Announcement.find().sort({ pinned: -1, date: -1 });
  res.json(list);
});

// create (protected)
router.post("/", auth, async (req, res) => {
  const a = await Announcement.create(req.body);
  res.json(a);
});

// update/delete (protected)
router.put("/:id", auth, async (req, res) => {
  const updated = await Announcement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});
router.delete("/:id", auth, async (req, res) => {
  await Announcement.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
router.get("/", async (req, res) => {
  try {
    const ann = await Announcement.find().sort({ date: -1 });
    res.json(ann);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// create
router.post("/", isAdmin, async (req, res) => {
  try {
    const a = new Announcement(req.body);
    await a.save();
    res.status(201).json(a);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const a = await Announcement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(a);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
