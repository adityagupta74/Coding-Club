import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";

export default function EventsPage() {
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    status: "Upcoming",
    participants: 0,
    location: "",
    duration: "",
    category: "",
  });

  // ✅ Check if logged-in user is admin
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  // ✅ Fetch events
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Input change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // ✅ Submit new event (only admin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (res.ok) {
        alert("✅ Event created successfully!");
        setShowModal(false);
        setNewEvent({
          name: "",
          description: "",
          date: "",
          time: "",
          status: "Upcoming",
          participants: 0,
          location: "",
          duration: "",
          category: "",
        });
        fetchEvents();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to create event");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const filteredEvents =
    filter === "all"
      ? events
      : events.filter((e) => e.status.toLowerCase() === filter.toLowerCase());

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-6 fw-bold mb-1">📅 Events</h1>
          <p className="mb-0 text-muted">
            Join exciting coding events and competitions
          </p>
        </div>

        {/* Admin Add Event Button */}
        {isAdmin && (
          <Button
            variant="success"
            onClick={() => setShowModal(true)}
            className="shadow-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "45px", height: "45px", fontSize: "24px" }}
          >
            ➕
          </Button>
        )}
      </div>

      {/* Filter Bar */}
      <Card className="card-custom mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex gap-2 flex-wrap">
                {["all", "upcoming", "ongoing", "completed"].map((f) => (
                  <Button
                    key={f}
                    size="sm"
                    variant={filter === f ? "primary" : "outline-primary"}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Events List */}
      <Row className="g-4">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-muted">No events available.</p>
        ) : (
          filteredEvents.map((event) => (
            <Col key={event._id} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="fw-bold mb-0">{event.name}</h5>
                    <Badge
                      bg={
                        event.status === "Ongoing"
                          ? "success"
                          : event.status === "Completed"
                          ? "secondary"
                          : "primary"
                      }
                    >
                      {event.status}
                    </Badge>
                  </div>
                  <p className="text-muted small mb-3">{event.description}</p>
                  <div className="mb-3">
                    <small>
                      📅 {event.date} {event.time && `at ${event.time}`}
                    </small>
                    <br />
                    <small>📍 {event.location || "TBD"}</small>
                    <br />
                    <small>⏱️ {event.duration || "N/A"}</small>
                    <br />
                    <small>👥 {event.participants} participants</small>
                  </div>
                  {event.category && (
                    <Badge bg="info" className="mb-3">
                      {event.category}
                    </Badge>
                  )}
                  {event.status !== "Completed" && (
                    <Button
                      variant={
                        event.status === "Ongoing" ? "success" : "primary"
                      }
                      size="sm"
                      className="w-100"
                    >
                      {event.status === "Ongoing" ? "Join Now" : "Register"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Add Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {[
              "name",
              "description",
              "date",
              "time",
              "location",
              "duration",
              "category",
            ].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  type={
                    field === "date"
                      ? "date"
                      : field === "time"
                      ? "time"
                      : "text"
                  }
                  as={field === "description" ? "textarea" : "input"}
                  rows={field === "description" ? 3 : undefined}
                  name={field}
                  value={newEvent[field]}
                  onChange={handleChange}
                  required={["name", "description", "date"].includes(field)}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={newEvent.status}
                onChange={handleChange}
              >
                <option>Upcoming</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </Form.Select>
            </Form.Group>

            <Button type="submit" className="w-100" variant="primary">
              Create Event
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
