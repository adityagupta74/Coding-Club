const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: { type: Date, default: Date.now },
  category: String,
  pinned: { type: Boolean, default: false },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
