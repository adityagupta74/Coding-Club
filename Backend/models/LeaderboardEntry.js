const mongoose = require("mongoose");

const LeaderboardSchema = new mongoose.Schema({
  name: String,
  score: Number,
  avatar: String,
  badge: String,
  change: String
});

module.exports = mongoose.model("LeaderboardEntry", LeaderboardSchema);
