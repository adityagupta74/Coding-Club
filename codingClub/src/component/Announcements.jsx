import { useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";

export default function Announcements() {
  // 🔹 Static dummy announcements (backend ke bina)
  const [announcements] = useState([
    {
      id: 1,
      title: "System Maintenance Scheduled",
      category: "Maintenance",
      desc: "Our servers will be under maintenance on Nov 5th from 1 AM to 3 AM. Expect temporary downtime during this period.",
      date: "Oct 30, 2025",
    },
    {
      id: 2,
      title: "New Feature: Event Tracker",
      category: "Update",
      desc: "We’ve added a new event tracking system for admins to monitor user activities in real-time.",
      date: "Oct 25, 2025",
    },
  ]);

  return (
    <Card className="card-custom h-100 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-semibold">📢 Announcements</h5>
          <Badge bg="primary">{announcements.length} new</Badge>
        </div>

        {announcements.length === 0 ? (
          <p className="text-muted text-center">No announcements yet.</p>
        ) : (
          <div className="d-flex flex-column gap-3">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="border-0 shadow-sm">
                <Card.Body className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="small fw-semibold mb-0">
                      {announcement.title}
                    </h6>
                    <Badge
                      bg={
                        announcement.category === "Maintenance"
                          ? "warning"
                          : "info"
                      }
                    >
                      {announcement.category}
                    </Badge>
                  </div>
                  <p className="small text-muted mb-2">{announcement.desc}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {announcement.date || "Recently added"}
                    </small>
                    <small
                      className="text-primary fw-semibold"
                      style={{ cursor: "pointer" }}
                    >
                      Read more
                    </small>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}

        <Button
          variant="outline-primary"
          size="sm"
          className="w-100 mt-3 fw-semibold"
        >
          View All Announcements
        </Button>
      </Card.Body>
    </Card>
  );
}
