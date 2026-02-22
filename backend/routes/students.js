const express = require('express');
const {
  getAllStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats,
  exportStudents,
} = require('../controllers/studentController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats/dashboard', protect, getDashboardStats);

// Export students to CSV (admin only)
router.get('/export/csv', protect, adminOnly, exportStudents);

// Get all students
router.get('/', protect, getAllStudents);

// Create student (admin only)
router.post('/', protect, adminOnly, createStudent);

// Get single student
router.get('/:id', protect, getStudent);

// Update student
router.put('/:id', protect, updateStudent);

// Delete student (allow owner or admin)
router.delete('/:id', protect, deleteStudent);

module.exports = router;
