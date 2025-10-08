import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./styles/App.css";

// Components
import Reports from "./components/Reports";
import StudentList from "./components/StudentList";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/">
              🎓 Student Grade Management System
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Students
                </Nav.Link>
                <Nav.Link as={Link} to="/reports">
                  Reports
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container fluid>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
