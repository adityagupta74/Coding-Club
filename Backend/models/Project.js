const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: String,
  tech: String,
  status: String,
  score: Number,
  date: Date,
  description: String
});

module.exports =mongoose.model("Project", ProjectSchema);
