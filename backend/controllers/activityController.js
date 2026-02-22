const ActivityLog = require('../models/ActivityLog');

// Helper function to log activity
exports.logActivity = async (userId, action, entity, description, entityId = null, metadata = {}, status = 'SUCCESS') => {
  try {
    await ActivityLog.create({
      userId,
      action,
      entity,
      description,
      entityId,
      metadata,
      status,
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
};

// @desc    Get user activity logs
// @route   GET /api/activity-logs
// @access  Private
exports.getActivityLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, action, entity } = req.query;

    let query = { userId: req.userId };

    if (action) query.action = action;
    if (entity) query.entity = entity;

    const logs = await ActivityLog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ActivityLog.countDocuments(query);

    res.status(200).json({
      success: true,
      count: logs.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      logs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get activity log statistics
// @route   GET /api/activity-logs/stats
// @access  Private
exports.getActivityStats = async (req, res) => {
  try {
    const stats = await ActivityLog.aggregate([
      {
        $match: { userId: new (require('mongoose')).Types.ObjectId(req.userId) },
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
