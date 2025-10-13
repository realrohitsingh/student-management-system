import React, { useEffect, useRef, useState } from "react";
import { Alert, Badge, Button, Card, Col, Row, Spinner, Table } from "react-bootstrap";
import { useStudentContext } from "./StudentContext";

const Reports = () => {
    const {
        loading,
        error,
        getTopStudents,
        getSubjectAverages,
        getAttendanceStats,
        clearError
    } = useStudentContext();

    const [topStudents, setTopStudents] = useState([]);
    const [subjectAverages, setSubjectAverages] = useState({});
    const [attendanceStats, setAttendanceStats] = useState(null);
    const reportsRef = useRef(null);

    useEffect(() => {
        const loadReports = async () => {
            try {
                const [topStudentsData, subjectAveragesData, attendanceStatsData] = await Promise.all([
                    getTopStudents(5),
                    getSubjectAverages(),
                    getAttendanceStats(),
                ]);

                setTopStudents(topStudentsData);
                setSubjectAverages(subjectAveragesData);
                setAttendanceStats(attendanceStatsData);
            } catch (err) {
                console.error("Failed to load reports:", err);
            }
        };

        loadReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "400px" }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    return (
        <div ref={reportsRef} className="container-fluid animate-fade-in">
            {error && (
                <Alert variant="danger" dismissible onClose={clearError}>
                    {error}
                </Alert>
            )}

            <Row className="mb-4">
                <Col>
                    <Card className="animate-slide-up">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <h4 className="mb-0 gradient-text">Academic Reports</h4>
                            <Button variant="primary" onClick={() => window.location.reload()}>
                                Refresh Reports
                            </Button>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>

            {/* Top Students */}
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Top 5 Students</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Roll Number</th>
                                        <th>Class</th>
                                        <th>Average Grade</th>
                                        <th>Attendance</th>
                                        <th>Overall Performance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {topStudents.map((student, index) => (
                                        <tr key={student.id}>
                                            <td>
                                                <Badge bg={index === 0 ? "warning" : index === 1 ? "secondary" : index === 2 ? "info" : "light"} text="dark">
                                                    #{index + 1}
                                                </Badge>
                                            </td>
                                            <td><strong>{student.name}</strong></td>
                                            <td>{student.rollNumber}</td>
                                            <td>
                                                <Badge bg="secondary">{student.class}</Badge>
                                            </td>
                                            <td>
                                                <Badge bg={getGradeColor(student.averageGrade)}>
                                                    {student.averageGrade.toFixed(1)}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg={getAttendanceColor(student.attendance)}>
                                                    {student.attendance}%
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge
                                                    bg={student.averageGrade >= 90 && student.attendance >= 90 ? "success" :
                                                        student.averageGrade >= 80 && student.attendance >= 85 ? "warning" :
                                                            "info"}
                                                >
                                                    {student.averageGrade >= 90 && student.attendance >= 90 ? "Excellent" :
                                                        student.averageGrade >= 80 && student.attendance >= 85 ? "Good" :
                                                            "Average"}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Subject-wise Averages */}
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Subject-wise Performance Analysis</h5>
                        </Card.Header>
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Average Grade</th>
                                        <th>Highest Grade</th>
                                        <th>Lowest Grade</th>
                                        <th>Total Students</th>
                                        <th>Performance Level</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(subjectAverages).map(([subject, data]) => (
                                        <tr key={subject}>
                                            <td><strong>{subject}</strong></td>
                                            <td>
                                                <Badge bg={getGradeColor(data.average)}>
                                                    {data.average}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Badge bg="success">{data.highest}</Badge>
                                            </td>
                                            <td>
                                                <Badge bg="danger">{data.lowest}</Badge>
                                            </td>
                                            <td>
                                                <Badge bg="info">{data.totalStudents}</Badge>
                                            </td>
                                            <td>
                                                <Badge
                                                    bg={data.average >= 90 ? "success" :
                                                        data.average >= 80 ? "warning" :
                                                            data.average >= 70 ? "info" : "danger"}
                                                >
                                                    {data.average >= 90 ? "Excellent" :
                                                        data.average >= 80 ? "Good" :
                                                            data.average >= 70 ? "Average" : "Needs Improvement"}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Attendance Statistics */}
            {attendanceStats && (
                <Row className="mb-4">
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h5 className="mb-0">Attendance Overview</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <p><strong>Total Students:</strong> {attendanceStats.totalStudents}</p>
                                        <p><strong>Average Attendance:</strong>
                                            <Badge bg={getAttendanceColor(attendanceStats.averageAttendance)} className="ms-2">
                                                {attendanceStats.averageAttendance}%
                                            </Badge>
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <Card.Header>
                                <h5 className="mb-0">Attendance Distribution</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <p>
                                            <Badge bg="success" className="me-2">Excellent (95%+)</Badge>
                                            {attendanceStats.attendanceRanges.excellent} students
                                        </p>
                                        <p>
                                            <Badge bg="warning" className="me-2">Good (85-94%)</Badge>
                                            {attendanceStats.attendanceRanges.good} students
                                        </p>
                                        <p>
                                            <Badge bg="info" className="me-2">Average (75-84%)</Badge>
                                            {attendanceStats.attendanceRanges.average} students
                                        </p>
                                        <p>
                                            <Badge bg="danger" className="me-2">Poor (&lt;75%)</Badge>
                                            {attendanceStats.attendanceRanges.poor} students
                                        </p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}

            {/* Performance Summary */}
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h5 className="mb-0">Performance Summary</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={3}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <h3 className="text-primary">{topStudents.length}</h3>
                                            <p className="mb-0">Top Performers</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <h3 className="text-success">{Object.keys(subjectAverages).length}</h3>
                                            <p className="mb-0">Subjects Tracked</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <h3 className="text-info">
                                                {attendanceStats ? attendanceStats.totalStudents : 0}
                                            </h3>
                                            <p className="mb-0">Total Students</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card className="text-center">
                                        <Card.Body>
                                            <h3 className="text-warning">
                                                {attendanceStats ? attendanceStats.averageAttendance : 0}%
                                            </h3>
                                            <p className="mb-0">Avg Attendance</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Reports;
