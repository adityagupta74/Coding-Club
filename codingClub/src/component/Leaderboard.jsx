import { useEffect, useState } from "react";
import { Card, Badge, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/leaderboard");
        const data = await res.json();
        setLeaders(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <Card className="card-custom h-100 d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="primary" />
      </Card>
    );
  }

  return (
    <Card className="card-custom">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">🏆 Leaderboard</h5>
          <Badge bg="success">Live</Badge>
        </div>

        {leaders.length === 0 ? (
          <p className="text-muted text-center">No leaders found</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {leaders.map((leader, i) => (
              <div
                key={leader._id || leader.id}
                className={`d-flex align-items-center gap-3 p-3 rounded ${
                  i === 0
                    ? "bg-warning bg-opacity-10 border border-warning"
                    : "bg-light"
                }`}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-center text-white fw-bold"
                  style={{
                    width: "32px",
                    height: "32px",
                    background:
                      i === 0
                        ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                        : i === 1
                        ? "linear-gradient(135deg, #d1d5db, #9ca3af)"
                        : i === 2
                        ? "linear-gradient(135deg, #fb923c, #f97316)"
                        : "linear-gradient(135deg, #818cf8, #6366f1)",
                  }}
                >
                  {i + 1}
                </div>

                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center border border-2 border-white"
                  style={{ width: "40px", height: "40px" }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2">
                    <span className="fw-semibold small">
                      {leader.name || "Anonymous"}
                    </span>
                    <span>{leader.badge || "🏅"}</span>
                  </div>
                  <small className="text-muted">
                    Score: {leader.score || 0}
                  </small>
                </div>

                <Badge
                  bg={
                    (leader.change || "+0").startsWith("+")
                      ? "success"
                      : "danger"
                  }
                >
                  {leader.change || "+0"}
                </Badge>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline-primary" size="sm" className="w-100 mt-3">
          View Full Leaderboard
        </Button>
      </Card.Body>
    </Card>
  );
}
