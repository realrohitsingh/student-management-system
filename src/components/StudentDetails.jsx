import React from "react";
import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";

const StudentDetails = ({ student, onEdit }) => {
    const calculateAverageGrade = () => {
        const totalGrades = student.grades.reduce((sum, grade) => sum + grade.grade, 0);
        return totalGrades / student.grades.length;
    };

    const getGradeColor = (grade) => {
        if (grade >= 90) return "success";
        if (grade >= 80) return "warning";
        if (grade >= 70) return "info";
        return "danger";
    };

    const getAttendanceColor = (attendance) => {
        if (attendance >= 95) return "success";
        if (attendance >= 85) return "warning";
        if (attendance >= 75) return "info";
        return "danger";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "Not provided";
        return new Date(dateString).toLocaleDateString();
    };

    const averageGrade = calculateAverageGrade();

    return (
        <div>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0">{student.name}</h4>
                            <Button variant="primary" onClick={onEdit}>
                                Edit Student
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <h6>Basic Information</h6>
                                    <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                                    <p><strong>Class:</strong> <Badge bg="secondary">{student.class}</Badge></p>
                                    <p><strong>Email:</strong> {student.email}</p>
                                    <p><strong>Phone:</strong> {student.phone || "Not provided"}</p>
                                    <p><strong>Date of Birth:</strong> {formatDate(student.dateOfBirth)}</p>
                                </Col>
                                <Col md={6}>
                                    <h6>Academic Performance</h6>
                                    <p>
                                        <strong>Attendance:</strong>{" "}
                                        <Badge bg={getAttendanceColor(student.attendance)}>
                                            {student.attendance}%
                                        </Badge>
                                    </p>
                                    <p>
                                        <strong>Present Days:</strong> {student.presentDays} / {student.totalDays}
                                    </p>
                                    <p>
                                        <strong>Average Grade:</strong>{" "}
                                        <Badge bg={getGradeColor(averageGrade)}>
                                            {averageGrade.toFixed(1)}
                                        </Badge>
                                    </p>
                                    <p><strong>Created:</strong> {formatDate(student.createdAt)}</p>
                                    <p><strong>Last Updated:</strong> {formatDate(student.updatedAt)}</p>
                                </Col>
                            </Row>

                            {student.address && (
                                <Row className="mt-3">
                                    <Col>
                                        <h6>Address</h6>
                                        <p>{student.address}</p>
                                    </Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Subject-wise Grades</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Grade</th>
                                        <th>Max Marks</th>
                                        <th>Percentage</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.grades.map((grade, index) => {
                                        const percentage = (grade.grade / grade.maxMarks) * 100;
                                        const status = percentage >= 90 ? "Excellent" :
                                            percentage >= 80 ? "Good" :
                                                percentage >= 70 ? "Average" : "Needs Improvement";

                                        return (
                                            <tr key={index}>
                                                <td><strong>{grade.subject}</strong></td>
                                                <td>
                                                    <Badge bg={getGradeColor(grade.grade)}>
                                                        {grade.grade}
                                                    </Badge>
                                                </td>
                                                <td>{grade.maxMarks}</td>
                                                <td>{percentage.toFixed(1)}%</td>
                                                <td>
                                                    <Badge
                                                        bg={percentage >= 90 ? "success" :
                                                            percentage >= 80 ? "warning" :
                                                                percentage >= 70 ? "info" : "danger"}
                                                    >
                                                        {status}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="table-info">
                                        <td><strong>Overall Average</strong></td>
                                        <td>
                                            <Badge bg={getGradeColor(averageGrade)}>
                                                {averageGrade.toFixed(1)}
                                            </Badge>
                                        </td>
                                        <td>{student.grades[0]?.maxMarks || 100}</td>
                                        <td>
                                            <Badge bg={getGradeColor(averageGrade)}>
                                                {((averageGrade / (student.grades[0]?.maxMarks || 100)) * 100).toFixed(1)}%
                                            </Badge>
                                        </td>
                                        <td>
                                            <Badge
                                                bg={averageGrade >= 90 ? "success" :
                                                    averageGrade >= 80 ? "warning" :
                                                        averageGrade >= 70 ? "info" : "danger"}
                                            >
                                                {averageGrade >= 90 ? "Excellent" :
                                                    averageGrade >= 80 ? "Good" :
                                                        averageGrade >= 70 ? "Average" : "Needs Improvement"}
                                            </Badge>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StudentDetails;
