import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../App";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (res.data && res.data.token) {
        const userData = res.data.user;
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser({
          name: userData.name,
          email: userData.email,
          role: userData.role,
          isLoggedIn: true,
          avatar: "",
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

        alert("✅ Login successful!");

        if (userData.role === "admin") {
          navigate("/events");
        } else {
          navigate("/");
        }
      } else {
        alert("❌ Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Login failed. Check credentials or server!");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          backgroundColor: "#fff",
        }}
      >
        <h2 className="text-center mb-4 fw-bold text-primary">
          <i className="bi bi-person-lock me-2"></i>Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "8px" }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold py-2"
            style={{ borderRadius: "8px", fontSize: "1.1rem" }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-decoration-none fw-semibold text-primary"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
