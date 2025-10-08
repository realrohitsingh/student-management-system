import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { studentService } from "../services/studentService";

const StudentForm = ({ student, mode, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: "",
        rollNumber: "",
        email: "",
        phone: "",
        class: "",
        dateOfBirth: "",
        address: "",
        attendance: 0,
        totalDays: 180,
        presentDays: 0,
        grades: [
            { subject: "Physics", grade: 0, maxMarks: 100 },
            { subject: "Mathematics", grade: 0, maxMarks: 100 },
            { subject: "Chemistry", grade: 0, maxMarks: 100 },
            { subject: "English", grade: 0, maxMarks: 100 },
            { subject: "Computer Science", grade: 0, maxMarks: 100 },
        ],
    });

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadClasses();

        if (student && mode === "edit") {
            setFormData({
                ...student,
                dateOfBirth: student.dateOfBirth ? student.dateOfBirth.split('T')[0] : "",
            });
        }
    }, [student, mode]);


    const loadClasses = async () => {
        try {
            const data = await studentService.getClasses();
            setClasses(data);
        } catch (err) {
            console.error("Failed to load classes:", err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGradeChange = (index, field, value) => {
        const updatedGrades = [...formData.grades];
        updatedGrades[index] = {
            ...updatedGrades[index],
            [field]: field === "grade" ? parseInt(value) || 0 : value,
        };
        setFormData((prev) => ({
            ...prev,
            grades: updatedGrades,
        }));
    };

    const handleAttendanceChange = (e) => {
        const { name, value } = e.target;
        const numValue = parseInt(value) || 0;

        setFormData((prev) => {
            const newData = { ...prev, [name]: numValue };

            if (name === "presentDays") {
                const attendance = (numValue / newData.totalDays) * 100;
                newData.attendance = parseFloat(attendance.toFixed(1));
            } else if (name === "totalDays") {
                const attendance = (newData.presentDays / numValue) * 100;
                newData.attendance = parseFloat(attendance.toFixed(1));
            }

            return newData;
        });
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Name is required");
            return false;
        }
        if (!formData.rollNumber.trim()) {
            setError("Roll Number is required");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }
        if (!formData.class) {
            setError("Class is required");
            return false;
        }

        // Validate grades
        for (const grade of formData.grades) {
            if (grade.grade < 0 || grade.grade > grade.maxMarks) {
                setError(`Grade for ${grade.subject} must be between 0 and ${grade.maxMarks}`);
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const studentData = {
                ...formData,
                createdAt: student?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            if (mode === "add") {
                await studentService.createStudent(studentData);
            } else {
                await studentService.updateStudent(student.id, studentData);
            }

            onSave();
        } catch (err) {
            setError("Failed to save student. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Name *</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Roll Number *</Form.Label>
                        <Form.Control
                            type="text"
                            name="rollNumber"
                            value={formData.rollNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Class *</Form.Label>
                        <Form.Select
                            name="class"
                            value={formData.class}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select Class</option>
                            {classes.map((cls) => (
                                <option key={cls} value={cls}>
                                    {cls}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Attendance %</Form.Label>
                        <Form.Control
                            type="number"
                            name="attendance"
                            value={formData.attendance}
                            onChange={handleAttendanceChange}
                            min="0"
                            max="100"
                            step="0.1"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Present Days</Form.Label>
                        <Form.Control
                            type="number"
                            name="presentDays"
                            value={formData.presentDays}
                            onChange={handleAttendanceChange}
                            min="0"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Total Days</Form.Label>
                        <Form.Control
                            type="number"
                            name="totalDays"
                            value={formData.totalDays}
                            onChange={handleAttendanceChange}
                            min="1"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                />
            </Form.Group>

            <h5>Grades</h5>
            <Row className="mb-3">
                {formData.grades.map((grade, index) => (
                    <Col md={6} key={grade.subject} className="mb-2">
                        <Form.Group>
                            <Form.Label>{grade.subject}</Form.Label>
                            <Row>
                                <Col md={8}>
                                    <Form.Control
                                        type="number"
                                        value={grade.grade}
                                        onChange={(e) =>
                                            handleGradeChange(index, "grade", e.target.value)
                                        }
                                        min="0"
                                        max={grade.maxMarks}
                                    />
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="number"
                                        value={grade.maxMarks}
                                        onChange={(e) =>
                                            handleGradeChange(index, "maxMarks", e.target.value)
                                        }
                                        min="1"
                                        readOnly
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Col>
                ))}
            </Row>

            <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Saving..." : mode === "add" ? "Add Student" : "Update Student"}
                </Button>
            </div>
        </Form>
    );
};

export default StudentForm;
