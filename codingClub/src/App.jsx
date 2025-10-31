import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import EventsPage from "./pages/EventsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Profile from "./pages/Profile";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import LoginPage from "./component/Login";
import SignUp from "./component/SignUp";
import Footer from "./component/Footer";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

function App() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    isLoggedIn: false,
    stats: {
      eventsJoined: 0,
      projects: 0,
      badges: 0,
      score: 0,
      streak: 0,
      rank: 0,
    },
    preferences: {
      theme: "light",
      notifications: true,
      emailUpdates: true,
    },
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "🎉 You've earned the 'Code Warrior' badge!",
      read: false,
      type: "achievement",
    },
    {
      id: 2,
      message: "📅 AI Workshop starts soon!",
      read: false,
      type: "event",
    },
  ]);

  // ✅ If user already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser((prev) => ({
        ...prev,
        ...parsedUser,
        isLoggedIn: true,
        stats: prev.stats, // keep default stats safe
      }));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, notifications, setNotifications }}
    >
      <Router>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {user.isLoggedIn ? (
            <div className="d-flex flex-grow-1">
              <Sidebar />
              <div className="flex-fill d-flex flex-column">
                <Navbar />
                <main className="flex-grow-1 p-4">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          )}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
