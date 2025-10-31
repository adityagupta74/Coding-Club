import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useUser } from "../App";

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, setNotifications } = useUser();
  const [filter, setFilter] = useState("all");

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === "unread") return !notif.read;
    if (filter === "read") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="position-fixed top-0 end-0 h-100 bg-white shadow-lg border-start"
            style={{ width: "380px", zIndex: 1050 }}
          >
            {/* Header */}
            <div className="p-3 border-bottom d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="m-0 fw-bold">Notifications</h5>
                <button
                  className="btn-close"
                  onClick={onClose}
                  aria-label="Close"
                ></button>
              </div>

              {/* Filter Tabs */}
              <div className="btn-group" role="group">
                {["all", "unread", "read"].map((filterType) => (
                  <button
                    key={filterType}
                    className={`btn btn-sm ${
                      filter === filterType
                        ? "btn-primary text-white"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => setFilter(filterType)}
                  >
                    {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    {filterType === "unread" && unreadCount > 0 && (
                      <span className="badge bg-danger ms-1">{unreadCount}</span>
                    )}
                  </button>
                ))}
              </div>

              {unreadCount > 0 && (
                <button
                  className="btn btn-link text-decoration-none p-0 mt-2"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-grow-1 overflow-auto p-3" style={{ maxHeight: "calc(100vh - 130px)" }}>
              {filteredNotifications.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: "80vh" }}>
                  <div className="fs-1 mb-2">🔔</div>
                  <p>No notifications</p>
                </div>
              ) : (
                filteredNotifications.map((notif, index) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`card mb-3 border-0 shadow-sm ${
                      notif.read ? "bg-light" : "bg-info bg-opacity-10 border-info"
                    }`}
                    onClick={() => !notif.read && markAsRead(notif.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body d-flex justify-content-between align-items-start">
                      <div className="flex-grow-1 me-2">
                        <div className="d-flex align-items-center mb-1">
                          <span className="me-2">{getNotificationIcon(notif.type)}</span>
                          {!notif.read && <span className="badge bg-primary rounded-circle" style={{ width: "8px", height: "8px" }}></span>}
                        </div>
                        <p className="mb-1 small text-dark">{notif.message}</p>
                        <small className="text-muted">{getTimeAgo(notif.timestamp || new Date())}</small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notif.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function getNotificationIcon(type) {
  const icons = {
    success: "✅",
    warning: "⚠️",
    error: "❌",
    info: "ℹ️",
    event: "📅",
    achievement: "🏆",
    message: "💬",
  };
  return icons[type] || icons.info;
}

function getTimeAgo(timestamp) {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
