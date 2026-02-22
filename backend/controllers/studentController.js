const User = require('../models/User');
const { generateCSV } = require('../utils/helpers');
const { logActivity } = require('./activityController');

// @desc    Get all students
// @route   GET /api/students
// @access  Private
exports.getAllStudents = async (req, res) => {
  try {
    const { search, branch, page = 1, limit = 10 } = req.query;

    let query = { role: 'student' };

    // Search by name, email, or roll number
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { rollNumber: new RegExp(search, 'i') },
      ];
    }

    // Filter by branch
    if (branch) {
      query.branch = branch;
    }

    const total = await User.countDocuments(query);
    const students = await User.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      students,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Private
exports.getStudent = async (req, res) => {
  try {
    console.log(`getStudent: req.userId=${req.userId} params.id=${req.params.id} method=${req.method}`);
    const student = await User.findById(req.params.id).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create student (for admin)
// @route   POST /api/students
// @access  Private/Admin
exports.createStudent = async (req, res) => {
  try {
    const { name, rollNumber, email, password, branch, year } = req.body;

    // Validate required fields
    if (!name || !rollNumber || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, roll number, and email are required',
      });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email: email.toLowerCase() });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Check if roll number already exists
    const rollExists = await User.findOne({ rollNumber: rollNumber.toUpperCase() });
    if (rollExists) {
      return res.status(400).json({
        success: false,
        message: 'Roll number already registered',
      });
    }

    // Generate temporary password if not provided
    const tempPassword = password || `Student@${rollNumber.toUpperCase()}`;

    const student = await User.create({
      name,
      rollNumber: rollNumber.toUpperCase(),
      email: email.toLowerCase(),
      password: tempPassword,
      branch,
      year,
      isVerified: true,
      role: 'student',
    });

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        rollNumber: student.rollNumber,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update student
// @route   PUT /api/students/:id
// @access  Private
exports.updateStudent = async (req, res) => {
  try {
    const { name, branch, semester } = req.body;

    // No role restriction: any authenticated user may update student records

    const student = await User.findByIdAndUpdate(
      req.params.id,
      { name, branch, semester },
      { new: true, runValidators: true }
    ).select('-password');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      student,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Delete student
// @route   DELETE /api/students/:id
// @access  Private/Admin
exports.deleteStudent = async (req, res) => {
  try {
    // No role restriction: any authenticated user may delete student records

    const student = await User.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/students/stats/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // Count total students
    const totalStudents = await User.countDocuments({ role: 'student' });

    // Count unique branches
    const branches = await User.distinct('branch', { role: 'student' });
    const totalBranches = branches.length;

    // Count students registered this month
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    const thisMonthCount = await User.countDocuments({
      role: 'student',
      createdAt: { $gte: monthStart },
    });

    const dashboardData = {
      totalStudents,
      totalBranches,
      thisMonthCount,
      recentCourses: [
        { id: 1, name: 'Data Structures', instructor: 'Dr. Smith', progress: 85, status: 'In Progress' },
        { id: 2, name: 'Algorithms', instructor: 'Prof. Johnson', progress: 78, status: 'In Progress' },
        { id: 3, name: 'Database Systems', instructor: 'Dr. Williams', progress: 92, status: 'Nearing Completion' },
        { id: 4, name: 'Web Development', instructor: 'Prof. Brown', progress: 88, status: 'In Progress' },
      ],
    };

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Export students to CSV
// @route   GET /api/students/export/csv
// @access  Private/Admin
exports.exportStudents = async (req, res) => {
  try {
    const { branch } = req.query;

    let query = { role: 'student' };
    if (branch) {
      query.branch = branch;
    }

    const students = await User.find(query).select('-password').sort({ createdAt: -1 });

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No students found',
      });
    }

    const exportData = students.map(student => ({
      'Roll Number': student.rollNumber,
      'Name': student.name,
      'Email': student.email,
      'Branch': student.branch || 'N/A',
      'Year': student.year || 'N/A',
      'Status': student.isVerified ? 'Verified' : 'Pending',
      'Joined Date': new Date(student.createdAt).toLocaleDateString(),
    }));

    const { csv } = generateCSV(exportData);

    // Log the export activity
    await logActivity(req.userId, 'EXPORT', 'STUDENT', `Exported ${students.length} students`);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="students_export.csv"');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
