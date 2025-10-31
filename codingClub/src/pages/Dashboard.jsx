import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import StatsCard from "../component/StatsCard";
import ChartCard from "../component/ChartCard";
import Announcements from "../component/Announcements";
import Leaderboard from "../component/Leaderboard";
import Events from "../component/Events";
import CodingStreak from "../component/CodingStreak";
import RecentProjects from "../component/RecentProjects";
import { useUser } from "../App";
import { useTheme } from "../context/ThemeContext";

export default function Dashboard() {
  const { user } = useUser();
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Container
      fluid
      className={`py-4 transition-all ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-header mb-4"
      >
        <Row className="align-items-center">
          <Col lg={8}>
            <h1 className="display-4 fw-bold mb-2">
              {greeting}, {user?.name || "Coder"} 👋
            </h1>
            <p className="fs-5 mb-2">
              Welcome to Coding Club Dashboard - One Place for Every Coder! 🚀
            </p>
            <p className="small opacity-75">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              • {currentTime.toLocaleTimeString()}
            </p>
          </Col>
          <Col lg={4} className="mt-3 mt-lg-0">
            <Row>
              <Col xs={6}>
                <div
                  className={`p-3 rounded ${
                    theme === "dark"
                      ? "bg-secondary bg-opacity-25"
                      : "bg-white bg-opacity-25"
                  }`}
                >
                  <small className="d-block opacity-75">Current Streak</small>
                  <h3 className="fw-bold mb-0">1 days 🔥</h3>
                </div>
              </Col>
              <Col xs={6}>
                <div
                  className={`p-3 rounded ${
                    theme === "dark"
                      ? "bg-secondary bg-opacity-25"
                      : "bg-white bg-opacity-25"
                  }`}
                >
                  <small className="d-block opacity-75">Total Score</small>
                  <h3 className="fw-bold mb-0">10 pts ⭐</h3>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </motion.div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col xs={6} lg={3}>
          <StatsCard title="Events Joined" value={2} color="bg-gradient-blue" icon="🎯" />
        </Col>
        <Col xs={6} lg={3}>
          <StatsCard title="Projects" value={6} color="bg-gradient-green" icon="💻" />
        </Col>
        <Col xs={6} lg={3}>
          <StatsCard title="Badges Earned" value={0} color="bg-gradient-orange" icon="🏆" />
        </Col>
        <Col xs={6} lg={3}>
          <StatsCard title="Global Rank" value={99} color="bg-gradient-purple" icon="👑" />
        </Col>
      </Row>

      {/* Main Content */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <ChartCard />
        </Col>
        <Col lg={4}>
          <CodingStreak />
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={4}>
          <Events />
        </Col>
        <Col lg={4}>
          <RecentProjects />
        </Col>
        <Col lg={4}>
          <Announcements />
        </Col>
      </Row>

      <Row>
        <Col>
          <Leaderboard />
        </Col>
      </Row>
    </Container>
  );
}
