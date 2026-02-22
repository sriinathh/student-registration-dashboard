const express = require('express');
const {
  getSettings,
  updateNotifications,
  updatePreferences,
  updatePrivacy,
} = require('../controllers/settingsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/', protect, getSettings);
router.put('/notifications', protect, updateNotifications);
router.put('/preferences', protect, updatePreferences);
router.put('/privacy', protect, updatePrivacy);

module.exports = router;
