# 🎓 Student Grade Management System

A comprehensive, full-stack Student Grade Management System built with React and JSON Server. This system allows teachers to efficiently manage student records, track academic performance, monitor attendance, and generate detailed reports with advanced filtering and analytics capabilities.

![React](https://img.shields.io/badge/React-19.1.1-blue.svg)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)
![JSON Server](https://img.shields.io/badge/JSON%20Server-1.0.0-green.svg)
![Vite](https://img.shields.io/badge/Vite-7.1.7-orange.svg)

## 🌟 Features

### 📚 **Student Management**
- **Complete CRUD Operations**: Add, view, edit, and delete student records
- **Comprehensive Student Profiles**: Name, roll number, email, phone, class, date of birth, address
- **Academic Tracking**: Subject-wise grades with customizable max marks
- **Attendance Management**: Track present days, total days, and calculate attendance percentage
- **Real-time Validation**: Form validation with error handling and user feedback

### 🔍 **Advanced Search & Filtering**
- **Multi-criteria Search**: Search by name, roll number, or email
- **Class-based Filtering**: Filter students by class (12A, 12B)
- **Subject Filtering**: Show students with grades in specific subjects
- **Dynamic Sorting**: Sort by name, roll number, attendance, or average grade
- **Real-time Results**: Instant filtering and sorting as you type

### 📊 **Comprehensive Reporting**
- **Top 5 Students**: Ranked list of best performing students
- **Subject-wise Analysis**: Average grades, highest/lowest scores per subject
- **Attendance Statistics**: Overall attendance trends and distribution
- **Performance Metrics**: Key insights and analytics
- **Visual Indicators**: Color-coded grades and attendance badges

### 🎨 **Modern User Interface**
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Bootstrap Components**: Professional and consistent UI/UX
- **Interactive Tables**: Sortable and filterable data tables
- **Modal Forms**: Clean, focused editing experience
- **Loading States**: Smooth user experience with loading indicators
- **Error Handling**: User-friendly error messages and validation

## 🛠 Technology Stack

### **Frontend**
- **React 19.1.1** - Modern React with latest features
- **React Router DOM 7.9.3** - Client-side routing
- **React Bootstrap 2.10.10** - UI component library
- **Bootstrap 5.3.8** - CSS framework
- **Axios 1.12.2** - HTTP client for API calls

### **Backend**
- **JSON Server 1.0.0** - REST API server
- **RESTful API** - Standard HTTP methods (GET, POST, PUT, DELETE)

### **Development Tools**
- **Vite 7.1.7** - Fast build tool and dev server
- **ESLint 9.36.0** - Code linting and quality
- **Concurrently 9.2.1** - Run multiple commands simultaneously

## 📁 Project Structure

```
react-assignment/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── StudentList.jsx      # Main student management interface
│   │   ├── StudentForm.jsx      # Add/Edit student form
│   │   ├── StudentDetails.jsx   # Detailed student view
│   │   ├── Reports.jsx          # Analytics and reports dashboard
│   │   ├── Header.jsx           # Navigation header
│   │   ├── Footer.jsx           # Footer component
│   │   └── MainContent.jsx     # Main content wrapper
│   ├── services/
│   │   └── studentService.js    # API service layer
│   ├── database/
│   │   └── data.json           # JSON Server database
│   ├── styles/
│   │   ├── App.css             # Main application styles
│   │   ├── index.css           # Global styles
│   │   ├── Header.css          # Header component styles
│   │   ├── Footer.css          # Footer component styles
│   │   └── MainContent.css     # Main content styles
│   ├── assets/
│   │   └── react.svg           # React logo
│   ├── App.jsx                 # Main application component
│   └── main.jsx               # Application entry point
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
└── README.md                 # Project documentation
```

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   # Option 1: Start both frontend and backend (Recommended)
   npm start
   
   # Option 2: Start separately
   # Terminal 1: Start JSON Server
   npm run json-server
   
   # Terminal 2: Start React App
   npm run dev
   ```

4. **Access the application**
   - **Frontend**: http://localhost:5173
   - **API**: http://localhost:3001

## 📊 Sample Data

The system comes with **8 comprehensive student records** featuring:

### **Student Demographics**
- **Geographic Diversity**: Students from 8 different Indian cities
- **Class Distribution**: 5 students in 12A, 3 students in 12B
- **Performance Range**: Average grades from 81.0% to 94.4%
- **Attendance Range**: From 83.9% to 100% attendance

### **Academic Subjects**
- Physics, Mathematics, Chemistry, English, Computer Science
- Grade ranges: 78-99 across all subjects
- Realistic performance variations

### **Sample Students**
1. **Rohit Singh** (12A) - Top performer (94.4% average, 100% attendance)
2. **Priya Sharma** (12A) - Excellent student (91.8% average, 95.5% attendance)
3. **Arjun Patel** (12B) - Good student (86.6% average, 88.3% attendance)
4. **Sneha Reddy** (12A) - High achiever (93.6% average, 92.8% attendance)
5. **Vikram Kumar** (12B) - Average student (87.2% average, 89.4% attendance)
6. **Ananya Gupta** (12A) - Outstanding student (94.4% average, 97.2% attendance)
7. **Rahul Verma** (12B) - Needs improvement (81.0% average, 83.9% attendance)
8. **Kavya Nair** (12A) - Strong performer (91.0% average, 94.4% attendance)

## 🔧 API Endpoints

### **Students**
- `GET /students` - Get all students
- `GET /students/:id` - Get student by ID
- `POST /students` - Create new student
- `PUT /students/:id` - Update student
- `DELETE /students/:id` - Delete student
- `GET /students?q=search` - Search students
- `GET /students?class=12A` - Filter by class

### **Metadata**
- `GET /subjects` - Get all subjects
- `GET /classes` - Get all classes

### **Advanced Queries**
- `GET /students?_sort=averageGrade&_order=desc` - Sort by average grade
- `GET /students?attendance_gte=90` - Filter by attendance ≥ 90%

## 💻 Usage Guide

### **Managing Students**

#### **Adding a Student**
1. Click "Add Student" button
2. Fill in personal information (name, roll number, email, phone, class, date of birth, address)
3. Set attendance information (present days, total days)
4. Enter grades for all subjects
5. Click "Add Student" to save

#### **Editing a Student**
1. Click "Edit" button next to any student
2. Modify the information in the form
3. Click "Update Student" to save changes

#### **Viewing Student Details**
1. Click "View" button to see comprehensive student information
2. View all grades, attendance, and performance metrics
3. Click "Edit Student" to modify details

#### **Deleting a Student**
1. Click "Delete" button
2. Confirm the deletion in the popup

### **Search and Filtering**

#### **Search Functionality**
- **Name Search**: Type student name to find specific students
- **Roll Number Search**: Search by roll number
- **Email Search**: Find students by email address
- **Real-time Results**: Results update as you type

#### **Filtering Options**
- **Class Filter**: Select class (12A, 12B) to filter students
- **Subject Filter**: Choose subject to show students with grades in that subject
- **Combined Filters**: Use multiple filters simultaneously

#### **Sorting Options**
- **Sort by Name**: Alphabetical ordering
- **Sort by Roll Number**: Numerical ordering
- **Sort by Attendance**: Highest to lowest attendance
- **Sort by Average Grade**: Best to worst performance
- **Sort Direction**: Ascending or descending order

### **Reports and Analytics**

#### **Top 5 Students Report**
- Ranked list of best performing students
- Average grade calculations
- Attendance correlation
- Overall performance indicators

#### **Subject-wise Analysis**
- Average grades per subject
- Highest and lowest scores
- Total students per subject
- Performance level indicators

#### **Attendance Statistics**
- Overall attendance trends
- Attendance distribution (Excellent, Good, Average, Poor)
- Class-wise attendance comparison
- Key metrics and insights

## 🎨 User Interface Features

### **Responsive Design**
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Enhanced tablet experience
- **Desktop Optimization**: Full-featured desktop interface

### **Interactive Components**
- **Data Tables**: Sortable and filterable student lists
- **Modal Forms**: Clean, focused editing experience
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

### **Visual Indicators**
- **Color-coded Grades**: Green (90+), Yellow (80-89), Blue (70-79), Red (<70)
- **Attendance Badges**: Visual attendance indicators
- **Performance Levels**: Clear performance categorization
- **Status Indicators**: Real-time status updates

## 🔧 Development

### **Available Scripts**
```bash
npm run dev          # Start React development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run json-server  # Start JSON Server
npm start           # Start both frontend and backend
```

### **Code Quality**
- **ESLint Configuration**: Consistent code style
- **React Hooks**: Modern React patterns
- **Component Architecture**: Modular, reusable components
- **Service Layer**: Clean API communication
- **Error Handling**: Comprehensive error management

### **Performance Optimizations**
- **Lazy Loading**: Components loaded on demand
- **Efficient Filtering**: Client-side filtering for better performance
- **Optimized Re-renders**: React best practices
- **Memory Management**: Proper cleanup and state management

## 🛠 Customization

### **Adding New Subjects**
1. Update the `subjects` array in `src/database/data.json`
2. The system will automatically include the new subject in forms and filters

### **Adding New Classes**
1. Update the `classes` array in `src/database/data.json`
2. New classes will appear in the class filter dropdown

### **Modifying Grade Scales**
1. Update the `maxMarks` field in student grade objects
2. Modify the color-coding logic in components if needed

### **Customizing Reports**
1. Modify the report generation logic in `Reports.jsx`
2. Add new metrics and calculations
3. Customize the visual presentation

## 🐛 Troubleshooting

### **Common Issues**

#### **"Failed to load students" Error**
- **Cause**: JSON Server not running
- **Solution**: Start JSON Server with `npm run json-server`
- **Check**: Ensure port 3001 is available

#### **CORS Issues**
- **Cause**: Cross-origin request problems
- **Solution**: JSON Server handles CORS automatically
- **Check**: Verify API endpoints are accessible

#### **Port Conflicts**
- **JSON Server**: Runs on port 3001
- **React Dev Server**: Runs on port 5173
- **Solution**: Change ports in package.json scripts if needed

#### **Build Issues**
- **Cause**: Dependency conflicts
- **Solution**: Delete `node_modules` and run `npm install`
- **Check**: Ensure Node.js version compatibility

### **Performance Tips**
- Use search and filter features for large datasets
- Reports are generated on-demand for better performance
- Consider pagination for very large student lists
- Monitor browser console for performance warnings

## 📈 Future Enhancements

### **Planned Features**
- **User Authentication**: Login/logout functionality
- **Role-based Access**: Teacher/Admin permissions
- **Data Export**: PDF/Excel report generation
- **Email Notifications**: Automated alerts
- **Mobile App**: React Native version
- **Advanced Analytics**: Charts and graphs
- **Bulk Operations**: Mass student updates
- **Backup/Restore**: Data management features

### **Technical Improvements**
- **Database Migration**: PostgreSQL/MySQL integration
- **API Optimization**: GraphQL implementation
- **Caching**: Redis for better performance
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipeline

## 🤝 Contributing

### **Getting Started**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### **Development Guidelines**
- Follow ESLint configuration
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Follow React best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Bootstrap Team** - For the comprehensive UI components
- **JSON Server** - For the simple REST API solution
- **Vite Team** - For the fast build tool
- **Open Source Community** - For the excellent libraries and tools

## 📞 Support

### **Getting Help**
1. Check the troubleshooting section
2. Review the browser console for errors
3. Ensure all dependencies are installed correctly
4. Verify JSON Server is running
5. Check network connectivity

### **Reporting Issues**
- Use GitHub Issues for bug reports
- Provide detailed error messages
- Include steps to reproduce
- Specify browser and OS information

---

**Built with ❤️ for Education**

*Happy Teaching! 🎓📚*