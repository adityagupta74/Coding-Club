const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  signupDate: { type: Date, default: Date.now },
  avatar: { type: String },
  stats: {
    streak: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("User", UserSchema);
