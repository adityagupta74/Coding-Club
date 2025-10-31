import React, { useEffect, useState } from "react";

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({ title: "", message: "" });
  const token = localStorage.getItem("token");

  // 🟢 Fetch announcements
  const fetchAnnouncements = async () => {
    const res = await fetch("http://localhost:5000/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  // 🟣 Add announcement
  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    setForm({ title: "", message: "" });
    fetchAnnouncements();
  };

  // 🟡 Update announcement
  const handleUpdate = async (id) => {
    const newTitle = prompt("Enter new title:");
    const newMsg = prompt("Enter new message:");
    if (!newTitle || !newMsg) return;

    await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle, message: newMsg }),
    });
    fetchAnnouncements();
  };

  // 🔴 Delete announcement
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAnnouncements();
  };

  return (
    <div className="p-4">
      <h2 className="fw-bold mb-3">📢 Manage Announcements</h2>

      <form onSubmit={handleAdd} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="form-control mb-2"
        />
        <textarea
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          className="form-control mb-2"
        />
        <button className="btn btn-primary w-100">Add Announcement</button>
      </form>

      <ul className="list-group">
        {announcements.map((a) => (
          <li
            key={a._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <h5>{a.title}</h5>
              <p>{a.message}</p>
            </div>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleUpdate(a._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(a._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminAnnouncements;
