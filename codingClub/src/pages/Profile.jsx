import { Container, Row, Col, Card, Badge, Button, Form, ProgressBar } from "react-bootstrap";
import { useUser } from "../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrophy, faFire, faCode, faCalendar, faEnvelope, faCog } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const { user } = useUser();

  const achievements = [
    { id: 1, name: "Code Warrior", icon: "🏆", desc: "Solved 100+ problems", date: "Dec 2024" },
    { id: 2, name: "Speed Demon", icon: "⚡", desc: "Completed 10 challenges in 1 day", date: "Nov 2024" },
    { id: 3, name: "Team Player", icon: "🤝", desc: "Participated in 5 team events", date: "Oct 2024" },
    { id: 4, name: "Streak Master", icon: "🔥", desc: "15 day coding streak", date: "Dec 2024" },
  ];

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "MongoDB", level: 70 },
  ];

  const recentActivity = [
    { id: 1, action: "Completed", item: "AI Workshop", date: "2 days ago", type: "event" },
    { id: 2, action: "Submitted", item: "E-Commerce Project", date: "3 days ago", type: "project" },
    { id: 3, action: "Solved", item: "50 DSA Problems", date: "1 week ago", type: "challenge" },
    { id: 4, action: "Joined", item: "Hackathon 2024", date: "2 weeks ago", type: "event" },
  ];

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <Card className="card-custom">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md={2} className="text-center">
                  <div 
                    className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: '120px', height: '120px', fontSize: '3rem' }}
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                </Col>
                <Col md={7}>
                  <h2 className="fw-bold mb-2">{user.name}</h2>
                  <p className="text-muted mb-3">
                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                    {user.email}
                  </p>
                  <p className="text-muted mb-3">
                    <FontAwesomeIcon icon={faCalendar} className="me-2" />
                    Joined {user.joinedDate}
                  </p>
                  <div className="d-flex gap-2">
                    <Badge bg="warning" className="px-3 py-2">
                      <FontAwesomeIcon icon={faTrophy} className="me-1" />
                      Rank #{user.stats.rank}
                    </Badge>
                    <Badge bg="danger" className="px-3 py-2">
                      <FontAwesomeIcon icon={faFire} className="me-1" />
                      {user.stats.streak} Day Streak
                    </Badge>
                    <Badge bg="success" className="px-3 py-2">
                      <FontAwesomeIcon icon={faCode} className="me-1" />
                      {user.stats.problemsSolved} Problems
                    </Badge>
                  </div>
                </Col>
                <Col md={3} className="text-end">
                  <Button variant="outline-primary" className="mb-2 w-100">
                    <FontAwesomeIcon icon={faCog} className="me-2" />
                    Edit Profile
                  </Button>
                  <Button variant="primary" className="w-100">Share Profile</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Stats */}
        <Col lg={4}>
          <Card className="card-custom mb-4">
            <Card.Body>
              <h5 className="mb-4">📊 Statistics</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Total Score</span>
                <span className="fw-bold text-primary">{user.stats.score}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Events Joined</span>
                <span className="fw-bold">{user.stats.eventsJoined}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Projects</span>
                <span className="fw-bold">{user.stats.projects}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Badges</span>
                <span className="fw-bold">{user.stats.badges}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Submissions</span>
                <span className="fw-bold">{user.stats.totalSubmissions}</span>
              </div>
            </Card.Body>
          </Card>

          <Card className="card-custom">
            <Card.Body>
              <h5 className="mb-4">🎯 Skills</h5>
              {skills.map((skill) => (
                <div key={skill.name} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small>{skill.name}</small>
                    <small className="fw-semibold">{skill.level}%</small>
                  </div>
                  <ProgressBar now={skill.level} variant="primary" />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* Achievements & Activity */}
        <Col lg={8}>
          <Card className="card-custom mb-4">
            <Card.Body>
              <h5 className="mb-4">🏆 Achievements</h5>
              <Row className="g-3">
                {achievements.map((achievement) => (
                  <Col key={achievement.id} md={6}>
                    <Card className="border h-100">
                      <Card.Body className="text-center">
                        <div className="fs-1 mb-2">{achievement.icon}</div>
                        <h6 className="fw-bold mb-1">{achievement.name}</h6>
                        <p className="small text-muted mb-1">{achievement.desc}</p>
                        <small className="text-muted">{achievement.date}</small>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          <Card className="card-custom">
            <Card.Body>
              <h5 className="mb-4">📈 Recent Activity</h5>
              <div className="d-flex flex-column gap-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                    <div 
                      className={`rounded-circle d-flex align-items-center justify-content-center text-white ${
                        activity.type === 'event' ? 'bg-primary' : 
                        activity.type === 'project' ? 'bg-success' : 'bg-warning'
                      }`}
                      style={{ width: '40px', height: '40px', minWidth: '40px' }}
                    >
                      {activity.type === 'event' ? '📅' : activity.type === 'project' ? '💻' : '🎯'}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-semibold">
                        {activity.action} <span className="text-primary">{activity.item}</span>
                      </div>
                      <small className="text-muted">{activity.date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
