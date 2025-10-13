import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light mt-auto py-3">
            <Container>
                <Row>
                    <Col md={6}>
                        <p className="mb-0">&copy; 2024 Student Grade Management System</p>
                        <small className="text-muted">Built with React, Bootstrap & JSON Server</small>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <div className="footer-links">
                            <a href="#privacy" className="text-light me-3">Privacy Policy</a>
                            <a href="#terms" className="text-light me-3">Terms of Service</a>
                            <a href="#support" className="text-light">Support</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
