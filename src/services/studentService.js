import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Student API service
export const studentService = {
  // Get all students
  getAllStudents: async () => {
    try {
      const response = await api.get("/students");
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  // Get student by ID
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching student:", error);
      throw error;
    }
  },

  // Create new student
  createStudent: async (studentData) => {
    try {
      const response = await api.post("/students", studentData);
      return response.data;
    } catch (error) {
      console.error("Error creating student:", error);
      throw error;
    }
  },

  // Update student
  updateStudent: async (id, studentData) => {
    try {
      const response = await api.put(`/students/${id}`, studentData);
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error);
      throw error;
    }
  },

  // Delete student
  deleteStudent: async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting student:", error);
      throw error;
    }
  },

  // Search students
  searchStudents: async (query) => {
    try {
      const response = await api.get(
        `/students?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching students:", error);
      throw error;
    }
  },

  // Filter students by class
  filterByClass: async (className) => {
    try {
      const response = await api.get(
        `/students?class=${encodeURIComponent(className)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error filtering by class:", error);
      throw error;
    }
  },

  // Get subjects list
  getSubjects: async () => {
    try {
      const response = await api.get("/subjects");
      return response.data.map((subject) => subject.name);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      throw error;
    }
  },

  // Get classes list
  getClasses: async () => {
    try {
      const response = await api.get("/classes");
      return response.data.map((cls) => cls.name);
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

  // Get students with specific grade range
  filterByGradeRange: async (subject, minGrade, maxGrade) => {
    try {
      // Since JSON Server doesn't support complex filtering, we'll fetch all and filter client-side
      const response = await api.get("/students");
      const students = response.data;

      return students.filter((student) => {
        const subjectGrade = student.grades.find(
          (grade) => grade.subject === subject
        );
        return (
          subjectGrade &&
          subjectGrade.grade >= minGrade &&
          subjectGrade.grade <= maxGrade
        );
      });
    } catch (error) {
      console.error("Error filtering by grade range:", error);
      throw error;
    }
  },

  // Get top performing students
  getTopStudents: async (limit = 5) => {
    try {
      const response = await api.get("/students");
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
    } catch (error) {
      console.error("Error getting top students:", error);
      throw error;
    }
  },

  // Get subject-wise averages
  getSubjectAverages: async () => {
    try {
      const response = await api.get("/students");
      const students = response.data;
      const subjects = await studentService.getSubjects();

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
    } catch (error) {
      console.error("Error getting subject averages:", error);
      throw error;
    }
  },

  // Get attendance statistics
  getAttendanceStats: async () => {
    try {
      const response = await api.get("/students");
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
    } catch (error) {
      console.error("Error getting attendance stats:", error);
      throw error;
    }
  },
};

export default studentService;
