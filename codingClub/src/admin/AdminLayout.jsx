import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light vh-100 p-3">
          <h5>Admin</h5>
          <Nav className="flex-column">
            <Nav.Item><Nav.Link as={Link} to="/admin">Dashboard</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/admin/events">Events</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/admin/announcements">Announcements</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/admin/leaderboard">Leaderboard</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/admin/projects">Projects</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/admin/users">Users</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link as={Link} to="/admin/stats">Stats</Nav.Link></Nav.Item>
          </Nav>
        </Col>
        <Col md={10} className="p-4">{children}</Col>
      </Row>
    </Container>
  );
}
