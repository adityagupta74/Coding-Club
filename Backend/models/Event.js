const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: Date,
  status: { type: String, enum: ["Upcoming","Ongoing","Completed"], default: "Upcoming" },
  participants: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", EventSchema);
