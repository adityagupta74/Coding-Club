const mongoose = require("mongoose");

const StatsSchema = new mongoose.Schema({
  totalUsers: { type: Number, default: 0 },
  totalProjects: { type: Number, default: 0 },
  totalEvents: { type: Number, default: 0 },
  totalAnnouncements: { type: Number, default: 0 },
  totalLeaderboards: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError:
const Stats = mongoose.models.Stats || mongoose.model("Stats", StatsSchema);

module.exports = Stats;
