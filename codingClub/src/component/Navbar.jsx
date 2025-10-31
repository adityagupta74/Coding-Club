import { useState, useEffect } from "react";
import {
  Navbar as BSNavbar,
  Container,
  Form,
  Button,
  Dropdown,
} from "react-bootstrap";
import { useUser } from "../App";
import { useTheme } from "../context/ThemeContext";
import NotificationPanel from "./NotificationPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBell,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const { user, setUser, notifications } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 🔹 Ensure body theme syncs with current theme
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogout = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
  };

  return (
    <>
      <BSNavbar
        className={`shadow-sm border-bottom py-3 ${
          theme === "dark" ? "bg-dark text-white" : "bg-white"
        }`}
      >
        <Container fluid>
          {/* 🔍 Search Bar */}
          <Form
            className="d-flex flex-grow-1 me-3"
            style={{ maxWidth: "500px" }}
          >
            <Form.Control
              type="search"
              placeholder="Search events, projects, members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`rounded-pill ${
                theme === "dark"
                  ? "bg-secondary text-white border-0"
                  : "bg-light text-dark"
              }`}
            />
          </Form>

          {/* 🔹 Right Side Controls */}
          <div className="d-flex align-items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant={theme === "dark" ? "secondary" : "light"}
              className="rounded-circle p-2"
              onClick={toggleTheme}
              style={{ width: "40px", height: "40px" }}
            >
              <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} />
            </Button>

            {/* Notifications */}
            <div className="position-relative">
              <Button
                variant={theme === "dark" ? "secondary" : "light"}
                className="rounded-circle p-2 position-relative"
                onClick={() => setShowNotifications(!showNotifications)}
                style={{ width: "40px", height: "40px" }}
              >
                <FontAwesomeIcon icon={faBell} />
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </div>

            {/* User Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle
                variant={theme === "dark" ? "secondary" : "light"}
                className="d-flex align-items-center gap-2 border-0"
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="text-start d-none d-sm-block">
                  <div className="fw-semibold small">
                    {user.name.split(" ")[0]}
                  </div>
                  <div
                    className={`small ${
                      theme === "dark" ? "text-light" : "text-muted"
                    }`}
                  >
                    Rank #1
                  </div>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu
                className={`${theme === "dark" ? "bg-dark text-white" : ""}`}
              >
                <Dropdown.Item>👤 View Profile</Dropdown.Item>
                <Dropdown.Item>⚙️ Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={handleLogout}
                  className="text-danger fw-semibold"
                >
                  🚪 Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </BSNavbar>

      {/* 🔔 Notifications Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
}
