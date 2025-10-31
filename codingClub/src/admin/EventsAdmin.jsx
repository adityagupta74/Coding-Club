import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";

const API = "http://localhost:5000/api/events";

export default function EventsAdmin() {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: "", date: "", description: "", status: "Upcoming" });

  const token = localStorage.getItem("token");

  const fetchEvents = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleCreate = async () => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type":"application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) { setShow(false); fetchEvents(); }
    else alert("Create failed");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete?")) return;
    const res = await fetch(`${API}/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) fetchEvents();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Events</h3>
        <Button onClick={() => setShow(true)}>New Event</Button>
      </div>

      <div className="d-flex flex-wrap gap-3">
        {events.map(ev => (
          <Card key={ev._id} style={{ width: 300 }}>
            <Card.Body>
              <Card.Title>{ev.name}</Card.Title>
              <Card.Text>{ev.description}</Card.Text>
              <small className="text-muted">{new Date(ev.date).toLocaleString()}</small>
              <div className="mt-2">
                <Button variant="danger" size="sm" onClick={() => handleDelete(ev._id)}>Delete</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>New Event</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="datetime-local" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button onClick={handleCreate}>Create</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
