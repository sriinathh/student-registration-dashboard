const express = require('express');
const {
  getActivityLogs,
  getActivityStats,
} = require('../controllers/activityController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/', protect, getActivityLogs);
router.get('/stats', protect, getActivityStats);

module.exports = router;
