const express = require('express');
const {
  getCourses,
  createCourse,
  getGrades,
  createGrade,
  getAttendance,
  createAttendance,
} = require('../controllers/academicController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Courses
// Allow public reads for courses (helpful for landing/dashboard previews)
router.get('/courses', getCourses);
router.post('/courses', protect, createCourse);

// Grades
// Allow public reads for grades (can be tightened later if needed)
router.get('/grades', getGrades);
router.post('/grades', protect, createGrade);

// Attendance
// Allow public reads for attendance records (read-only)
router.get('/attendance', getAttendance);
router.post('/attendance', protect, createAttendance);

module.exports = router;
