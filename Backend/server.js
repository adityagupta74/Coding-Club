const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/auth");
const announcementsRoutes = require("./routes/announcements");
const eventsRoutes = require("./routes/events");
const leaderboardRoutes = require("./routes/leaderboard");
const projectsRoutes = require("./routes/projects");
const statsRoutes = require("./routes/stats");
const seedRoutes = require("./routes/seed");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"], // Allow both dev origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ In CommonJS, __dirname is already available
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/seed", seedRoutes);



app.get("/", (req, res) => res.send("Coding Club Backend is running 🚀"));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Mongo connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Mongo connection error:", err));
