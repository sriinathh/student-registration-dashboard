const mongoose = require('mongoose');
const Course = require('../models/Course');
const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');

// Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ name: 1 });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error('getCourses error:', err);
    // If DB is not connected, return sample data so frontend can still function
    if (mongoose.connection.readyState !== 1) {
      const sample = [
        { _id: 'sample-1', code: 'CSE101', name: 'Intro to CS', instructor: 'Prof. A' },
        { _id: 'sample-2', code: 'MTH101', name: 'Calculus I', instructor: 'Prof. B' },
      ];
      return res.status(200).json({ success: true, courses: sample, warning: 'DB not connected - returning sample data' });
    }
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { code, name, instructor } = req.body;
    if (!code || !name) {
      return res.status(400).json({ success: false, message: 'code and name are required' });
    }
    const course = await Course.create({ code, name, instructor });
    res.status(201).json({ success: true, course });
  } catch (err) {
    console.error('createCourse error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// Grades
exports.getGrades = async (req, res) => {
  try {
    const grades = await Grade.find().populate('student', 'name rollNumber').populate('course', 'name code');
    res.status(200).json({ success: true, grades });
  } catch (err) {
    console.error('getGrades error:', err);
    if (mongoose.connection.readyState !== 1) {
      const sample = [
        { _id: 'g1', student: { name: 'Alice', rollNumber: 'CSE001' }, course: { name: 'Intro to CS', code: 'CSE101' }, grade: 'A' },
      ];
      return res.status(200).json({ success: true, grades: sample, warning: 'DB not connected - returning sample data' });
    }
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

exports.createGrade = async (req, res) => {
  try {
    const { student, course, grade } = req.body;
    if (!student || !course) {
      return res.status(400).json({ success: false, message: 'student and course are required' });
    }
    const g = await Grade.create({ student, course, grade });
    res.status(201).json({ success: true, grade: g });
  } catch (err) {
    console.error('createGrade error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

// Attendance
exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('student', 'name rollNumber').populate('course', 'name');
    res.status(200).json({ success: true, attendance: records });
  } catch (err) {
    console.error('getAttendance error:', err);
    if (mongoose.connection.readyState !== 1) {
      const sample = [
        { _id: 'a1', student: { name: 'Bob', rollNumber: 'CSE002' }, course: { name: 'Intro to CS' }, date: new Date(), status: 'present' },
      ];
      return res.status(200).json({ success: true, attendance: sample, warning: 'DB not connected - returning sample data' });
    }
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const { student, course, date, status } = req.body;
    if (!student || !course) {
      return res.status(400).json({ success: false, message: 'student and course are required' });
    }
    const a = await Attendance.create({ student, course, date, status });
    res.status(201).json({ success: true, attendance: a });
  } catch (err) {
    console.error('createAttendance error:', err);
    res.status(500).json({ success: false, message: err.message || 'Server error' });
  }
};
