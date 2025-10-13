import React, { useEffect, useRef } from "react";
import {
    Alert,
    Badge,
    Button,
    Card,
    Col,
    Form,
    InputGroup,
    Row,
    Spinner,
    Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useStudentContext } from "./StudentContext";

const StudentList = () => {
    const {
        students,
        filteredStudents,
        loading,
        error,
        searchTerm,
        classFilter,
        subjectFilter,
        sortBy,
        sortOrder,
        subjects,
        classes,
        getAllStudents,
        getSubjects,
        getClasses,
        deleteStudent,
        setSearchTerm,
        setClassFilter,
        setSubjectFilter,
        setSortBy,
        setSortOrder,
        setFilteredStudents,
        clearError
    } = useStudentContext();

    const navigate = useNavigate();
    const searchInputRef = useRef(null);

    const loadData = async () => {
        try {
            await Promise.all([
                getAllStudents(),
                getSubjects(),
                getClasses()
            ]);
        } catch (err) {
            console.error("Failed to load data:", err);
        }
    };

    const filterAndSortStudents = () => {
        let filtered = [...students];

        if (searchTerm) {
            filtered = filtered.filter(
                (student) =>
                    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    student.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (classFilter) {
            filtered = filtered.filter((student) => student.class === classFilter);
        }

        if (subjectFilter) {
            filtered = filtered.filter((student) =>
                student.grades.some((grade) => grade.subject === subjectFilter)
            );
        }

        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case "name":
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case "rollNumber":
                    aValue = a.rollNumber;
                    bValue = b.rollNumber;
                    break;
                case "attendance":
                    aValue = a.attendance;
                    bValue = b.attendance;
                    break;
                case "averageGrade":
                    aValue = calculateAverageGrade(a);
                    bValue = calculateAverageGrade(b);
                    break;
                default:
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
            }

            if (sortOrder === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        setFilteredStudents(filtered);
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        filterAndSortStudents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [students, searchTerm, classFilter, subjectFilter, sortBy, sortOrder]);

    const calculateAverageGrade = (student) => {
        const totalGrades = student.grades.reduce((sum, grade) => sum + grade.grade, 0);
        return totalGrades / student.grades.length;
    };

    const handleAddStudent = () => {
        navigate('/student/new');
    };

    const handleEditStudent = (student) => {
        navigate(`/student/${student.id}/edit`);
    };

    const handleViewStudent = (student) => {
        navigate(`/student/${student.id}`);
    };

    const handleDeleteStudent = async (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await deleteStudent(id);
            } catch (err) {
                console.error("Failed to delete student:", err);
            }
        }
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
        <div className="container-fluid animate-fade-in">
            <Row className="mb-4">
                <Col>
                    <Card className="animate-slide-up">
                        <Card.Header>
                            <h4 className="mb-0 gradient-text">Student Grade Management System</h4>
                        </Card.Header>
                        <Card.Body>
                            {error && (
                                <Alert variant="danger" dismissible onClose={clearError}>
                                    {error}
                                </Alert>
                            )}

                            {/* Search and Filter Controls */}
                            <Row className="mb-3">
                                <Col md={4}>
                                    <InputGroup className="animate-slide-up">
                                        <InputGroup.Text>
                                            <i className="bi bi-search"></i>
                                        </InputGroup.Text>
                                        <Form.Control
                                            ref={searchInputRef}
                                            type="text"
                                            placeholder="Search students..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={2}>
                                    <Form.Select
                                        value={classFilter}
                                        onChange={(e) => setClassFilter(e.target.value)}
                                    >
                                        <option value="">All Classes</option>
                                        {classes.map((cls) => (
                                            <option key={cls} value={cls}>
                                                {cls}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Form.Select
                                        value={subjectFilter}
                                        onChange={(e) => setSubjectFilter(e.target.value)}
                                    >
                                        <option value="">All Subjects</option>
                                        {subjects.map((subject) => (
                                            <option key={subject} value={subject}>
                                                {subject}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col md={2}>
                                    <Form.Select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="rollNumber">Sort by Roll Number</option>
                                        <option value="attendance">Sort by Attendance</option>
                                        <option value="averageGrade">Sort by Average Grade</option>
                                    </Form.Select>
                                </Col>
                                <Col md={1}>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                                    >
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </Button>
                                </Col>
                                <Col md={1}>
                                    <Button variant="primary" onClick={handleAddStudent}>
                                        Add Student
                                    </Button>
                                </Col>
                            </Row>

                            {/* Students Table */}
                            <div className="table-responsive">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Roll Number</th>
                                            <th>Class</th>
                                            <th>Email</th>
                                            <th>Attendance</th>
                                            <th>Average Grade</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredStudents.map((student) => {
                                            const averageGrade = calculateAverageGrade(student);
                                            return (
                                                <tr key={student.id}>
                                                    <td>{student.name}</td>
                                                    <td>{student.rollNumber}</td>
                                                    <td>
                                                        <Badge bg="secondary">{student.class}</Badge>
                                                    </td>
                                                    <td>{student.email}</td>
                                                    <td>
                                                        <Badge bg={getAttendanceColor(student.attendance)}>
                                                            {student.attendance}%
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Badge bg={getGradeColor(averageGrade)}>
                                                            {averageGrade.toFixed(1)}
                                                        </Badge>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="info"
                                                            size="sm"
                                                            className="me-1"
                                                            onClick={() => handleViewStudent(student)}
                                                        >
                                                            View
                                                        </Button>
                                                        <Button
                                                            variant="warning"
                                                            size="sm"
                                                            className="me-1"
                                                            onClick={() => handleEditStudent(student)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDeleteStudent(student.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </div>

                            {filteredStudents.length === 0 && (
                                <Alert variant="info" className="text-center">
                                    No students found matching your criteria.
                                </Alert>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </div>
    );
};

export default StudentList;
