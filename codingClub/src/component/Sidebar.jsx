import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Projects", path: "/projects", icon: "💻" },
    { name: "Events", path: "/events", icon: "📅" },
    { name: "Leaderboard", path: "/leaderboard", icon: "🏆" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <div
      className={`border-end shadow-sm ${
        theme === "dark" ? "bg-dark text-light" : "bg-white text-dark"
      }`}
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <div className="p-4 text-center">
        {/* Logo Title */}
        <h2
          className="h4 fw-bold mb-1 text-nowrap"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          💻 Coding Club
        </h2>

        {/* Subtitle */}
        <p
          className={`small mb-0 ${
            theme === "dark" ? "text-light opacity-75" : "text-muted"
          }`}
        >
          One Place for Every Coder
        </p>
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column px-3">
        {menu.map((item) => (
          <Nav.Link
            key={item.name}
            as={Link}
            to={item.path}
            className={`d-flex align-items-center gap-2 rounded mb-2 py-3 px-3 ${
              location.pathname === item.path
                ? "text-white fw-semibold"
                : theme === "dark"
                ? "text-light"
                : "text-dark"
            }`}
            style={
              location.pathname === item.path
                ? {
                    background:
                      theme === "dark"
                        ? "linear-gradient(135deg, #00e0ff 0%, #7afcff 100%)"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }
                : {}
            }
          >
            <span className="fs-5">{item.icon}</span>
            <span>{item.name}</span>
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}
