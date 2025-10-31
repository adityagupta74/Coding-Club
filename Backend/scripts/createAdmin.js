// scripts/createAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await User.findOne({ email: "admin@club.local" });
    if (existing) return console.log("Admin already exists");
    const hash = bcrypt.hashSync("admin123", 10);
    const admin = await User.create({
      name: "Admin",
      email: "admin@club.local",
      passwordHash: hash,
      role: "admin",
    });
    console.log("Admin created:", admin._id);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
