const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const isAdmin = require("../middleware/isAdmin");

// 🟢 Public: Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
});

// ✅ Create new event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", err });
  }
});

// 🔵 Admin: Create event
router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, description, date, status, participants } = req.body;

    const newEvent = new Event({
      name,
      description,
      date,
      status,
      participants,
    });

    await newEvent.save();
    res
      .status(201)
      .json({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating event" });
  }
});

// 🟣 Admin: Update event
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🔴 Admin: Delete event
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
