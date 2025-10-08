# Student Grade Management System

A comprehensive React-based Student Grade Management System that allows teachers to manage student records, grades, attendance, and generate detailed reports. Built with React, React Bootstrap, and JSON Server for data persistence.

## Features

### 🎓 Student Management

- **Add Students**: Create new student records with comprehensive information
- **Edit Students**: Update existing student data including grades and attendance
- **Delete Students**: Remove student records with confirmation
- **View Details**: Detailed student profiles with academic performance

### 📊 Advanced Filtering & Search

- **Search**: Find students by name, roll number, or email
- **Filter by Class**: Filter students by their class (12A, 12B, etc.)
- **Filter by Subject**: Show students who have grades in specific subjects
- **Sort Options**: Sort by name, roll number, attendance, or average grade
- **Real-time Search**: Instant filtering as you type

### 📈 Comprehensive Reports

- **Top 5 Students**: Ranked list of best performing students
- **Subject-wise Analysis**: Average grades, highest/lowest scores per subject
- **Attendance Statistics**: Overall attendance trends and distribution
- **Performance Summary**: Key metrics and insights

### 🎨 Modern UI/UX

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Bootstrap Components**: Professional and consistent UI
- **Color-coded Grades**: Visual indicators for performance levels
- **Interactive Tables**: Sortable and filterable data tables
- **Modal Forms**: Clean, focused editing experience

## Technology Stack

- **Frontend**: React 19.1.1 with React Router
- **UI Framework**: React Bootstrap 2.10.10
- **Backend**: JSON Server for REST API
- **HTTP Client**: Axios for API communication
- **Build Tool**: Vite 7.1.7
- **Development**: ESLint for code quality

## Project Structure

```
src/
├── components/
│   ├── StudentList.jsx      # Main student management interface
│   ├── StudentForm.jsx      # Add/Edit student form
│   ├── StudentDetails.jsx   # Detailed student view
│   └── Reports.jsx          # Analytics and reports
├── services/
│   └── studentService.js    # API service layer
├── database/
│   └── data.json           # JSON Server database
├── styles/
│   └── App.css             # Custom styles
├── App.jsx                 # Main application component
└── main.jsx               # Application entry point
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-assignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Application

#### Option A: Start Both Frontend and Backend (Recommended)

```bash
npm start
```

This command runs both JSON Server (port 3001) and React development server (port 5173) concurrently.

#### Option B: Start Separately

```bash
# Terminal 1: Start JSON Server
npm run json-server

# Terminal 2: Start React App
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3001

## API Endpoints

The JSON Server provides the following REST API endpoints:

### Students

- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student
- `GET /students?q=search` - Search students
- `GET /students?class=12A` - Filter by class

### Metadata

- `GET /subjects` - Get all subjects
- `GET /classes` - Get all classes

## Usage Guide

### Managing Students

1. **Adding a Student**:

   - Click "Add Student" button
   - Fill in the form with student details
   - Add grades for each subject
   - Set attendance information
   - Click "Add Student" to save

2. **Editing a Student**:

   - Click "Edit" button next to any student
   - Modify the information in the form
   - Click "Update Student" to save changes

3. **Viewing Student Details**:

   - Click "View" button to see comprehensive student information
   - View all grades, attendance, and performance metrics

4. **Deleting a Student**:
   - Click "Delete" button
   - Confirm the deletion in the popup

### Using Filters and Search

1. **Search**: Type in the search box to find students by name, roll number, or email
2. **Class Filter**: Select a class from the dropdown to filter students
3. **Subject Filter**: Choose a subject to show only students with grades in that subject
4. **Sorting**: Use the sort dropdown and direction button to organize the list

### Generating Reports

1. Navigate to the "Reports" tab
2. View automatically generated reports:
   - **Top 5 Students**: Best performing students ranked by average grade
   - **Subject Analysis**: Performance metrics for each subject
   - **Attendance Overview**: Attendance statistics and distribution
   - **Performance Summary**: Key metrics and insights

## Data Structure

### Student Object

```json
{
  "id": 1,
  "name": "Student Name",
  "rollNumber": "R101",
  "email": "student@email.com",
  "phone": "+91-9876543210",
  "class": "12A",
  "attendance": 95.5,
  "totalDays": 180,
  "presentDays": 172,
  "grades": [
    {
      "subject": "Physics",
      "grade": 88,
      "maxMarks": 100
    }
  ],
  "dateOfBirth": "2005-03-15",
  "address": "123 Main Street, Delhi",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Customization

### Adding New Subjects

1. Update the `subjects` array in `src/database/data.json`
2. The system will automatically include the new subject in forms and filters

### Adding New Classes

1. Update the `classes` array in `src/database/data.json`
2. New classes will appear in the class filter dropdown

### Modifying Grade Scales

1. Update the `maxMarks` field in student grade objects
2. Modify the color-coding logic in components if needed

## Development

### Available Scripts

- `npm run dev` - Start React development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run json-server` - Start JSON Server
- `npm start` - Start both frontend and backend

### Code Quality

- ESLint configuration for consistent code style
- React Hooks best practices
- Component-based architecture
- Service layer for API communication

## Troubleshooting

### Common Issues

1. **"Failed to load students" Error**:

   - Ensure JSON Server is running on port 3001
   - Check if `src/database/data.json` exists and is valid JSON

2. **CORS Issues**:

   - JSON Server handles CORS automatically
   - If issues persist, check browser console for specific errors

3. **Port Conflicts**:
   - JSON Server runs on port 3001
   - React dev server runs on port 5173
   - Change ports in package.json scripts if needed

### Performance Tips

- Use the search and filter features to manage large datasets
- Reports are generated on-demand for better performance
- Consider pagination for very large student lists

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review the browser console for errors
3. Ensure all dependencies are installed correctly
4. Verify JSON Server is running

---

**Happy Teaching! 🎓📚**
"# student-management-system" 
