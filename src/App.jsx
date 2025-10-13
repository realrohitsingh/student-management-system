import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import "./styles/App.css";

import Footer from "./components/Footer";
import Reports from "./components/Reports";
import { StudentProvider } from "./components/StudentContext";
import StudentDetails from "./components/StudentDetails";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const Navigation = () => {
  const location = useLocation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <span className="me-2">🎓</span>
          Student Grade Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
            >
              📊 Students
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/reports"
              className={location.pathname === "/reports" ? "active" : ""}
            >
              📈 Reports
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function App() {
  return (
    <StudentProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Navigation />

          <main className="flex-grow-1">
            <Container fluid className="px-3">
              <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/student/:id" element={<StudentDetails />} />
                <Route path="/student/:id/edit" element={<StudentForm />} />
                <Route path="/student/new" element={<StudentForm />} />
              </Routes>
            </Container>
          </main>

          <Footer />
        </div>
      </Router>
    </StudentProvider>
  );
}

export default App;
