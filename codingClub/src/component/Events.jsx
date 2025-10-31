import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../App";
import { Button, Modal, Form } from "react-bootstrap";

export default function EventsPage() {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    status: "Upcoming",
  });

  // 🔹 Fetch Events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Add Event (only admin)
  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/add",
        newEvent
      );
      alert("✅ Event added successfully!");
      setShowModal(false);
      setNewEvent({ name: "", description: "", date: "", status: "Upcoming" });
      fetchEvents();
    } catch (error) {
      alert("❌ Error adding event!");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🎉 Events</h2>
        {user.role === "admin" && (
          <Button variant="primary" onClick={() => setShowModal(true)}>
            ➕ Add Event
          </Button>
        )}
      </div>

      <div className="row justify-content-center">
        {events.map((event) => (
          <div key={event._id} className="col-md-6 col-lg-10 mb-4">
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body px-4 py-3">
                <h5 className="card-title fw-bold text-primary mb-2">
                  {event.name}
                </h5>
                <p className="card-text text-muted mb-3">{event.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-secondary">
                    📅 {new Date(event.date).toLocaleDateString()}
                  </small>
                  <span
                    className={`badge ${
                      event.status === "Completed"
                        ? "bg-success"
                        : event.status === "Ongoing"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Add Event Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddEvent}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newEvent.description}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={newEvent.status}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, status: e.target.value })
                }
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
