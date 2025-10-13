import axios from 'axios';
import React, { createContext, useContext, useMemo, useReducer } from 'react';

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const initialState = {
    students: [],
    subjects: [],
    classes: [],
    loading: false,
    error: null,
    selectedStudent: null,
    filteredStudents: [],
    searchTerm: '',
    classFilter: '',
    subjectFilter: '',
    sortBy: 'name',
    sortOrder: 'asc'
};

const ActionTypes = {
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    CLEAR_ERROR: 'CLEAR_ERROR',
    SET_STUDENTS: 'SET_STUDENTS',
    ADD_STUDENT: 'ADD_STUDENT',
    UPDATE_STUDENT: 'UPDATE_STUDENT',
    DELETE_STUDENT: 'DELETE_STUDENT',
    SET_SUBJECTS: 'SET_SUBJECTS',
    SET_CLASSES: 'SET_CLASSES',
    SET_SELECTED_STUDENT: 'SET_SELECTED_STUDENT',
    SET_FILTERED_STUDENTS: 'SET_FILTERED_STUDENTS',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_CLASS_FILTER: 'SET_CLASS_FILTER',
    SET_SUBJECT_FILTER: 'SET_SUBJECT_FILTER',
    SET_SORT_BY: 'SET_SORT_BY',
    SET_SORT_ORDER: 'SET_SORT_ORDER'
};

const studentReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.SET_LOADING:
            return { ...state, loading: action.payload };

        case ActionTypes.SET_ERROR:
            return { ...state, error: action.payload, loading: false };

        case ActionTypes.CLEAR_ERROR:
            return { ...state, error: null };

        case ActionTypes.SET_STUDENTS:
            return { ...state, students: action.payload };

        case ActionTypes.ADD_STUDENT:
            return { ...state, students: [...state.students, action.payload] };

        case ActionTypes.UPDATE_STUDENT:
            return {
                ...state,
                students: state.students.map(student =>
                    student.id === action.payload.id ? action.payload : student
                )
            };

        case ActionTypes.DELETE_STUDENT:
            return {
                ...state,
                students: state.students.filter(student => student.id !== action.payload)
            };

        case ActionTypes.SET_SUBJECTS:
            return { ...state, subjects: action.payload };

        case ActionTypes.SET_CLASSES:
            return { ...state, classes: action.payload };

        case ActionTypes.SET_SELECTED_STUDENT:
            return { ...state, selectedStudent: action.payload };

        case ActionTypes.SET_FILTERED_STUDENTS:
            return { ...state, filteredStudents: action.payload };

        case ActionTypes.SET_SEARCH_TERM:
            return { ...state, searchTerm: action.payload };

        case ActionTypes.SET_CLASS_FILTER:
            return { ...state, classFilter: action.payload };

        case ActionTypes.SET_SUBJECT_FILTER:
            return { ...state, subjectFilter: action.payload };

        case ActionTypes.SET_SORT_BY:
            return { ...state, sortBy: action.payload };

        case ActionTypes.SET_SORT_ORDER:
            return { ...state, sortOrder: action.payload };

        default:
            return state;
    }
};

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(studentReducer, initialState);

    const getAllStudents = async () => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });

            const response = await api.get("/students");

            if (response.status === 200) {
                dispatch({ type: ActionTypes.SET_STUDENTS, payload: response.data });
                return response.data;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch students";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    };

    const getStudentById = async (id) => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });

            const response = await api.get(`/students/${id}`);

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch student";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    };

    const createStudent = async (studentData) => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });

            const response = await api.post("/students", studentData);

            if (response.status === 201) {
                dispatch({ type: ActionTypes.ADD_STUDENT, payload: response.data });
                return response.data;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to create student";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    };

    const updateStudent = async (id, studentData) => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });

            const response = await api.put(`/students/${id}`, studentData);

            if (response.status === 200) {
                dispatch({ type: ActionTypes.UPDATE_STUDENT, payload: response.data });
                return response.data;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to update student";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    };

    const deleteStudent = async (id) => {
        try {
            dispatch({ type: ActionTypes.SET_LOADING, payload: true });
            dispatch({ type: ActionTypes.CLEAR_ERROR });

            const response = await api.delete(`/students/${id}`);

            if (response.status === 200) {
                dispatch({ type: ActionTypes.DELETE_STUDENT, payload: id });
                return response.data;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete student";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        } finally {
            dispatch({ type: ActionTypes.SET_LOADING, payload: false });
        }
    };

    const getSubjects = async () => {
        try {
            const response = await api.get("/subjects");

            if (response.status === 200) {
                const subjects = response.data.map((subject) => subject.name);
                dispatch({ type: ActionTypes.SET_SUBJECTS, payload: subjects });
                return subjects;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch subjects";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        }
    };

    const getClasses = async () => {
        try {
            const response = await api.get("/classes");

            if (response.status === 200) {
                const classes = response.data.map((cls) => cls.name);
                dispatch({ type: ActionTypes.SET_CLASSES, payload: classes });
                return classes;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch classes";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        }
    };

    const getTopStudents = async (limit = 5) => {
        try {
            const response = await api.get("/students");

            if (response.status === 200) {
                const students = response.data;

                // Calculate average grades for each student
                const studentsWithAverages = students.map((student) => {
                    const totalGrades = student.grades.reduce(
                        (sum, grade) => sum + grade.grade,
                        0
                    );
                    const averageGrade = totalGrades / student.grades.length;
                    return { ...student, averageGrade };
                });

                // Sort by average grade and return top students
                return studentsWithAverages
                    .sort((a, b) => b.averageGrade - a.averageGrade)
                    .slice(0, limit);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch top students";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        }
    };

    const getSubjectAverages = async () => {
        try {
            const response = await api.get("/students");

            if (response.status === 200) {
                const students = response.data;
                const subjects = await getSubjects();

                const subjectAverages = {};

                subjects.forEach((subject) => {
                    const grades = students
                        .flatMap((student) =>
                            student.grades.filter((grade) => grade.subject === subject)
                        )
                        .map((grade) => grade.grade);

                    if (grades.length > 0) {
                        const average =
                            grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
                        subjectAverages[subject] = {
                            average: parseFloat(average.toFixed(2)),
                            totalStudents: grades.length,
                            highest: Math.max(...grades),
                            lowest: Math.min(...grades),
                        };
                    }
                });

                return subjectAverages;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch subject averages";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        }
    };

    const getAttendanceStats = async () => {
        try {
            const response = await api.get("/students");

            if (response.status === 200) {
                const students = response.data;

                const stats = {
                    totalStudents: students.length,
                    averageAttendance: 0,
                    attendanceRanges: {
                        excellent: 0, // 95%+
                        good: 0, // 85-94%
                        average: 0, // 75-84%
                        poor: 0, // <75%
                    },
                };

                let totalAttendance = 0;

                students.forEach((student) => {
                    totalAttendance += student.attendance;

                    if (student.attendance >= 95) stats.attendanceRanges.excellent++;
                    else if (student.attendance >= 85) stats.attendanceRanges.good++;
                    else if (student.attendance >= 75) stats.attendanceRanges.average++;
                    else stats.attendanceRanges.poor++;
                });

                stats.averageAttendance = parseFloat(
                    (totalAttendance / students.length).toFixed(2)
                );

                return stats;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to fetch attendance stats";
            dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
            throw error;
        }
    };

    const value = useMemo(() => ({
        ...state,
        getAllStudents,
        getStudentById,
        createStudent,
        updateStudent,
        deleteStudent,
        getSubjects,
        getClasses,
        getTopStudents,
        getSubjectAverages,
        getAttendanceStats,
        setSelectedStudent: (student) => dispatch({ type: ActionTypes.SET_SELECTED_STUDENT, payload: student }),
        setSearchTerm: (term) => dispatch({ type: ActionTypes.SET_SEARCH_TERM, payload: term }),
        setClassFilter: (filter) => dispatch({ type: ActionTypes.SET_CLASS_FILTER, payload: filter }),
        setSubjectFilter: (filter) => dispatch({ type: ActionTypes.SET_SUBJECT_FILTER, payload: filter }),
        setSortBy: (sortBy) => dispatch({ type: ActionTypes.SET_SORT_BY, payload: sortBy }),
        setSortOrder: (order) => dispatch({ type: ActionTypes.SET_SORT_ORDER, payload: order }),
        setFilteredStudents: (students) => dispatch({ type: ActionTypes.SET_FILTERED_STUDENTS, payload: students }),
        clearError: () => dispatch({ type: ActionTypes.CLEAR_ERROR })
    }), [state, getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent, getSubjects, getClasses, getTopStudents, getSubjectAverages, getAttendanceStats]);

    return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
    );
};

export const useStudentContext = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudentContext must be used within a StudentProvider');
    }
    return context;
};

export default StudentContext;
