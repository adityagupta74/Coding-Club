import { Container, Row, Col, Card, Badge, Form, Button, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function LeaderboardPage() {
  const [filter, setFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("weekly");

  const allLeaders = [
    { id: 1, name: "Shyam Yadav", score: 1250, badge: "🥇", problems: 128, streak: 15, rank: 1, change: "+2" },
    { id: 2, name: "Rishi Kumar", score: 1180, badge: "🥈", problems: 115, streak: 12, rank: 2, change: "+1" },
    { id: 3, name: "Aditya Singh", score: 1120, badge: "🥉", problems: 108, streak: 10, rank: 3, change: "-1" },
    { id: 4, name: "Priya Sharma", score: 1050, badge: "🏅", problems: 98, streak: 8, rank: 4, change: "+3" },
    { id: 5, name: "Rahul Verma", score: 1020, badge: "🏅", problems: 95, streak: 7, rank: 5, change: "0" },
    { id: 6, name: "Sneha Patel", score: 980, badge: "🏅", problems: 89, streak: 6, rank: 6, change: "+1" },
    { id: 7, name: "Arjun Reddy", score: 950, badge: "🏅", problems: 85, streak: 5, rank: 7, change: "-2" },
    { id: 8, name: "Kavya Iyer", score: 920, badge: "🏅", problems: 82, streak: 4, rank: 8, change: "+1" },
    { id: 9, name: "Vikram Singh", score: 890, badge: "🏅", problems: 78, streak: 3, rank: 9, change: "0" },
    { id: 10, name: "Ananya Das", score: 860, badge: "🏅", problems: 75, streak: 2, rank: 10, change: "+2" },
  ];

  const getRankBg = (rank) => {
    if (rank === 1) return 'linear-gradient(135deg, #fbbf24, #f59e0b)';
    if (rank === 2) return 'linear-gradient(135deg, #d1d5db, #9ca3af)';
    if (rank === 3) return 'linear-gradient(135deg, #fb923c, #f97316)';
    return 'linear-gradient(135deg, #818cf8, #6366f1)';
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="gradient-header mb-4"
      >
        <Row className="align-items-center">
          <Col>
            <h1 className="display-5 fw-bold mb-2">🏆 Leaderboard</h1>
            <p className="mb-0">Compete with the best coders in the club!</p>
          </Col>
          <Col xs="auto">
            <Badge bg="success" className="fs-6 px-3 py-2">Live Rankings</Badge>
          </Col>
        </Row>
      </motion.div>

      {/* Filters */}
      <Card className="card-custom mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex gap-2 align-items-center">
                <span className="fw-semibold">Time Range:</span>
                <ButtonGroup size="sm">
                  <Button 
                    variant={timeRange === "daily" ? "primary" : "outline-primary"}
                    onClick={() => setTimeRange("daily")}
                  >
                    Daily
                  </Button>
                  <Button 
                    variant={timeRange === "weekly" ? "primary" : "outline-primary"}
                    onClick={() => setTimeRange("weekly")}
                  >
                    Weekly
                  </Button>
                  <Button 
                    variant={timeRange === "monthly" ? "primary" : "outline-primary"}
                    onClick={() => setTimeRange("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button 
                    variant={timeRange === "alltime" ? "primary" : "outline-primary"}
                    onClick={() => setTimeRange("alltime")}
                  >
                    All Time
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
            <Col md={6} className="mt-3 mt-md-0">
              <Form.Control 
                type="search" 
                placeholder="Search members..." 
                size="sm"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Top 3 Podium */}
      <Row className="mb-4 g-3">
        {/* 2nd Place */}
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="card-custom text-center" style={{ background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)' }}>
              <Card.Body className="py-4">
                <div className="position-relative d-inline-block mb-3">
                  <div 
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center border border-4 border-white shadow"
                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div 
                    className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-center text-white fw-bold"
                    style={{ width: '32px', height: '32px', background: getRankBg(2) }}
                  >
                    2
                  </div>
                </div>
                <h5 className="fw-bold mb-1">{allLeaders[1].name}</h5>
                <div className="fs-1 mb-2">🥈</div>
                <h3 className="fw-bold text-primary mb-2">{allLeaders[1].score}</h3>
                <div className="d-flex justify-content-center gap-3 small text-muted">
                  <span>💻 {allLeaders[1].problems}</span>
                  <span>🔥 {allLeaders[1].streak}</span>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* 1st Place */}
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <Card className="card-custom text-center" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', transform: 'scale(1.05)' }}>
              <Card.Body className="py-4">
                <div className="position-relative d-inline-block mb-3">
                  <div 
                    className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center border border-4 border-warning shadow-lg"
                    style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div 
                    className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-center text-white fw-bold"
                    style={{ width: '36px', height: '36px', background: getRankBg(1) }}
                  >
                    1
                  </div>
                </div>
                <h4 className="fw-bold mb-1">{allLeaders[0].name}</h4>
                <div className="fs-1 mb-2">👑</div>
                <h2 className="fw-bold text-warning mb-2">{allLeaders[0].score}</h2>
                <div className="d-flex justify-content-center gap-3 small">
                  <span>💻 {allLeaders[0].problems}</span>
                  <span>🔥 {allLeaders[0].streak}</span>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* 3rd Place */}
        <Col md={4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-custom text-center" style={{ background: 'linear-gradient(135deg, #fed7aa, #fdba74)' }}>
              <Card.Body className="py-4">
                <div className="position-relative d-inline-block mb-3">
                  <div 
                    className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center border border-4 border-white shadow"
                    style={{ width: '80px', height: '80px', fontSize: '2rem' }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div 
                    className="position-absolute bottom-0 end-0 rounded-circle d-flex align-items-center justify-center text-white fw-bold"
                    style={{ width: '32px', height: '32px', background: getRankBg(3) }}
                  >
                    3
                  </div>
                </div>
                <h5 className="fw-bold mb-1">{allLeaders[2].name}</h5>
                <div className="fs-1 mb-2">🥉</div>
                <h3 className="fw-bold text-warning mb-2">{allLeaders[2].score}</h3>
                <div className="d-flex justify-content-center gap-3 small text-muted">
                  <span>💻 {allLeaders[2].problems}</span>
                  <span>🔥 {allLeaders[2].streak}</span>
                </div>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* Full Leaderboard Table */}
      <Card className="card-custom">
        <Card.Body>
          <h5 className="mb-4">Complete Rankings</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Member</th>
                  <th>Score</th>
                  <th>Problems</th>
                  <th>Streak</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {allLeaders.map((leader, i) => (
                  <motion.tr 
                    key={leader.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={i < 3 ? 'table-warning' : ''}
                  >
                    <td>
                      <div 
                        className="rounded-circle d-inline-flex align-items-center justify-center text-white fw-bold"
                        style={{ 
                          width: '32px', 
                          height: '32px',
                          background: getRankBg(leader.rank)
                        }}
                      >
                        {leader.rank}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                          style={{ width: '40px', height: '40px' }}
                        >
                          <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div>
                          <div className="fw-semibold">{leader.name}</div>
                          <small className="text-muted">{leader.badge}</small>
                        </div>
                      </div>
                    </td>
                    <td className="fw-bold text-primary">{leader.score}</td>
                    <td>{leader.problems}</td>
                    <td>
                      <Badge bg="warning" text="dark">{leader.streak} 🔥</Badge>
                    </td>
                    <td>
                      <Badge bg={leader.change.startsWith('+') ? 'success' : leader.change === '0' ? 'secondary' : 'danger'}>
                        {leader.change === '0' ? '—' : leader.change}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
