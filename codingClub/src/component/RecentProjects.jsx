import { Card, Badge, Button } from "react-bootstrap";
import { useState } from "react";

export default function RecentProjects() {
  // 🔹 Static dummy data (backend aane tak)
  const [projects] = useState([
    {
      id: 1,
      name: "AI Chatbot",
      status: "Completed",
      tech: "React, Node.js, OpenAI API",
      date: "Oct 20, 2025",
      score: 95,
    },
    {
      id: 2,
      name: "E-Commerce Dashboard",
      status: "In Progress",
      tech: "MERN Stack, Redux, MongoDB",
      date: "Oct 15, 2025",
      score: 82,
    },
    {
      id: 3,
      name: "Portfolio Website",
      status: "Completed",
      tech: "Next.js, TailwindCSS",
      date: "Sep 30, 2025",
      score: 90,
    },
  ]);

  return (
    <Card className="card-custom h-100 shadow-sm">
      <Card.Body>
        <h5 className="mb-4 fw-semibold">🚀 Recent Projects</h5>

        <div className="d-flex flex-column gap-3">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id} className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0 fw-semibold">{project.name}</h6>
                    <Badge
                      bg={
                        project.status === "Completed"
                          ? "success"
                          : project.status === "In Progress"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="small text-muted mb-2">{project.tech}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{project.date}</small>
                    {project.score && (
                      <small className="fw-semibold text-primary">
                        ⭐ Score: {project.score}/100
                      </small>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-muted">No projects found.</p>
          )}
        </div>

        <Button
          variant="outline-primary"
          size="sm"
          className="w-100 mt-3 fw-semibold"
        >
          View All Projects
        </Button>
      </Card.Body>
    </Card>
  );
}
