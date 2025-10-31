const express = require("express");
const Announcement = require("../models/Announcement");
const Event = require("../models/Event");
const LeaderboardEntry = require("../models/LeaderboardEntry");
const Project = require("../models/Project");
const Stats = require("../models/Stats");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/", async (req, res) => {
  // wipe small collections
  await Announcement.deleteMany({});
  await Event.deleteMany({});
  await LeaderboardEntry.deleteMany({});
  await Project.deleteMany({});
  await Stats.deleteMany({});
  await User.deleteMany({});

  const salt = bcrypt.genSaltSync(10);
  const admin = await User.create({ name: "Admin", email: "admin@club.com", passwordHash: bcrypt.hashSync("admin123", salt), role: "admin", stats: { streak: 23, score: 1200 } });
  const user1 = await User.create({ name: "Shyam Yadav", email: "shyam@club.com", passwordHash: bcrypt.hashSync("pass123", salt), stats: { streak: 12, score: 980 } });

  await Announcement.insertMany([
    { title: "Hackathon 2025 Registration Open!", desc: "Join the biggest coding event of the year.", category: "Event", date: new Date() },
    { title: "New DSA Challenge Series", desc: "Weekly challenges to boost your skills.", category: "Challenge", date: new Date(Date.now()-86400000) },
    { title: "Club Meeting - Project Showcase", desc: "Present your projects and get feedback.", category: "Meeting", date: new Date(Date.now()-3*86400000) }
  ]);

  await Event.insertMany([
    { name: "AI Workshop", description: "Learn AI fundamentals", date: new Date("2024-12-25T10:00:00Z"), status: "Upcoming", participants: 45 },
    { name: "Web Dev Challenge", description: "Build a responsive website", date: new Date("2024-12-20T14:00:00Z"), status: "Ongoing", participants: 32 },
    { name: "Hackathon 2024", description: "48-hour coding marathon", date: new Date("2024-12-30T09:00:00Z"), status: "Upcoming", participants: 120 }
  ]);

  await LeaderboardEntry.insertMany([
    { name: "Shyam Yadav", score: 980, badge: "🥇", change: "+15" },
    { name: "Rishi Kumar", score: 940, badge: "🥈", change: "+8" },
    { name: "Aditya Singh", score: 900, badge: "🥉", change: "-2" }
  ]);

  await Project.insertMany([
    { name: "E-Commerce Website", tech: "React, Node.js", status: "Completed", score: 95, date: new Date() },
    { name: "Chat Application", tech: "Socket.io, Express", status: "In Progress", date: new Date(Date.now()-5*86400000) },
    { name: "Weather App", tech: "JavaScript, API", status: "Completed", score: 88, date: new Date(Date.now()-7*86400000) }
  ]);

  // stats for charts
  const base = new Date();
  const stats = [];
  for (let i = 6; i >= 0; i--) {
    stats.push({ userId: user1._id, date: new Date(base.getTime() - i*24*60*60*1000), score: Math.floor(40 + Math.random()*60), problems: Math.floor(2 + Math.random()*15) });
  }
  await Stats.insertMany(stats);

  res.json({ success: true, adminEmail: "admin@club.com", adminPassword: "admin123" });
});

module.exports=router;