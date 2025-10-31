import { Container, Row, Col, Card, Badge, Button, Form, ProgressBar } from "react-bootstrap";
import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const projects = [
    {
      id: 1, name: "E-Commerce Website", tech: ["React", "Node.js", "MongoDB"], 
      status: "Completed", score: 95, date: "2 days ago", 
      description: "Full-stack e-commerce platform with payment integration",
      github: "github.com/user/ecommerce", likes: 45, comments: 12
    },
    {
      id: 2, name: "Chat Application", tech: ["Socket.io", "Express", "React"], 
      status: "In Progress", progress: 75, date: "5 days ago",
      description: "Real-time chat app with rooms and private messaging",
      github: "github.com/user/chat-app", likes: 32, comments: 8
    },
    {
      id: 3, name: "Weather App", tech: ["JavaScript", "API", "CSS"], 
      status: "Completed", score: 88, date: "1 week ago",
      description: "Weather forecast app using OpenWeather API",
      github: "github.com/user/weather", likes: 28, comments: 5
    },
    {
      id: 4, name: "Task Manager", tech: ["Vue.js", "Firebase"], 
      status: "Completed", score: 92, date: "2 weeks ago",
      description: "Productivity app with drag-and-drop functionality",
      github: "github.com/user/tasks", likes: 38, comments: 10
    },
    {
      id: 5, name: "Portfolio Website", tech: ["Next.js", "Tailwind"], 
      status: "In Progress", progress: 60, date: "3 days ago",
      description: "Personal portfolio with blog and project showcase",
      github: "github.com/user/portfolio", likes: 25, comments: 6
    },
    {
      id: 6, name: "AI Image Generator", tech: ["Python", "TensorFlow", "Flask"], 
      status: "In Progress", progress: 40, date: "1 week ago",
      description: "Generate images using AI models",
      github: "github.com/user/ai-gen", likes: 52, comments: 15
    },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter(p => p.status.toLowerCase().replace(" ", "") === filter);

  return (
    <Container fluid className="py-4">
      <div className="gradient-header mb-4">
        <Row className="align-items-center">
          <Col>
            <h1 className="display-5 fw-bold mb-2">💻 Projects</h1>
            <p className="mb-0">Showcase your coding projects</p>
          </Col>
          <Col xs="auto">
            <Button variant="light" size="lg">+ New Project</Button>
          </Col>
        </Row>
      </div>

      <Card className="card-custom mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex gap-2">
                <Button size="sm" variant={filter === "all" ? "primary" : "outline-primary"} onClick={() => setFilter("all")}>All</Button>
                <Button size="sm" variant={filter === "completed" ? "success" : "outline-success"} onClick={() => setFilter("completed")}>Completed</Button>
                <Button size="sm" variant={filter === "inprogress" ? "warning" : "outline-warning"} onClick={() => setFilter("inprogress")}>In Progress</Button>
              </div>
            </Col>
            <Col md={6} className="mt-3 mt-md-0">
              <Form.Control type="search" placeholder="Search projects..." size="sm" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {filteredProjects.map((project) => (
          <Col key={project.id} md={6} lg={4}>
            <Card className="card-custom h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="fw-bold mb-0">{project.name}</h5>
                  <Badge bg={project.status === "Completed" ? "success" : "warning"}>
                    {project.status}
                  </Badge>
                </div>
                
                <p className="text-muted small mb-3">{project.description}</p>
                
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {project.tech.map((tech, i) => (
                    <Badge key={i} bg="secondary" className="px-2 py-1">{tech}</Badge>
                  ))}
                </div>

                {project.status === "In Progress" && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <small className="text-muted">Progress</small>
                      <small className="fw-semibold">{project.progress}%</small>
                    </div>
                    <ProgressBar now={project.progress} variant="warning" />
                  </div>
                )}

                {project.status === "Completed" && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="small text-muted">Score</span>
                      <span className="h4 fw-bold text-primary mb-0">{project.score}/100</span>
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-muted">{project.date}</small>
                  <div className="d-flex gap-3">
                    <small>❤️ {project.likes}</small>
                    <small>💬 {project.comments}</small>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" className="flex-grow-1">View</Button>
                  <Button variant="outline-secondary" size="sm">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
