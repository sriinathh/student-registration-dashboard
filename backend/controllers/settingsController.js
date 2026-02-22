const Settings = require('../models/Settings');
const User = require('../models/User');

// @desc    Get user settings
// @route   GET /api/settings
// @access  Private
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.userId });

    // Create default settings if not exists
    if (!settings) {
      const defaultSettings = {
        userId: req.userId,
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          courseUpdates: true,
          assignmentReminders: true,
          gradeNotifications: true,
        },
        preferences: {
          darkMode: false,
          twoFactorAuth: false,
          language: 'en',
        },
        privacy: {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
        },
      };
      settings = await Settings.create(defaultSettings);
    }

    res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update notification settings
// @route   PUT /api/settings/notifications
// @access  Private
exports.updateNotifications = async (req, res) => {
  try {
    const { emailNotifications, pushNotifications, courseUpdates, assignmentReminders, gradeNotifications } = req.body;

    let settings = await Settings.findOne({ userId: req.userId });

    if (!settings) {
      const defaultSettings = {
        userId: req.userId,
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          courseUpdates: true,
          assignmentReminders: true,
          gradeNotifications: true,
        },
        preferences: {
          darkMode: false,
          twoFactorAuth: false,
          language: 'en',
        },
        privacy: {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
        },
      };
      settings = await Settings.create(defaultSettings);
    }

    settings.notifications = {
      emailNotifications: emailNotifications !== undefined ? emailNotifications : (settings.notifications?.emailNotifications || true),
      pushNotifications: pushNotifications !== undefined ? pushNotifications : (settings.notifications?.pushNotifications || true),
      courseUpdates: courseUpdates !== undefined ? courseUpdates : (settings.notifications?.courseUpdates || true),
      assignmentReminders: assignmentReminders !== undefined ? assignmentReminders : (settings.notifications?.assignmentReminders || true),
      gradeNotifications: gradeNotifications !== undefined ? gradeNotifications : (settings.notifications?.gradeNotifications || true),
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Notification settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update preference settings
// @route   PUT /api/settings/preferences
// @access  Private
exports.updatePreferences = async (req, res) => {
  try {
    const { darkMode, twoFactorAuth, language } = req.body;

    let settings = await Settings.findOne({ userId: req.userId });

    if (!settings) {
      const defaultSettings = {
        userId: req.userId,
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          courseUpdates: true,
          assignmentReminders: true,
          gradeNotifications: true,
        },
        preferences: {
          darkMode: false,
          twoFactorAuth: false,
          language: 'en',
        },
        privacy: {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
        },
      };
      settings = await Settings.create(defaultSettings);
    }

    settings.preferences = {
      darkMode: darkMode !== undefined ? darkMode : (settings.preferences?.darkMode || false),
      twoFactorAuth: twoFactorAuth !== undefined ? twoFactorAuth : (settings.preferences?.twoFactorAuth || false),
      language: language || (settings.preferences?.language || 'en'),
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Preferences updated successfully',
      settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Update privacy settings
// @route   PUT /api/settings/privacy
// @access  Private
exports.updatePrivacy = async (req, res) => {
  try {
    const { profileVisibility, showEmail, showPhone } = req.body;

    let settings = await Settings.findOne({ userId: req.userId });

    if (!settings) {
      const defaultSettings = {
        userId: req.userId,
        notifications: {
          emailNotifications: true,
          pushNotifications: true,
          courseUpdates: true,
          assignmentReminders: true,
          gradeNotifications: true,
        },
        preferences: {
          darkMode: false,
          twoFactorAuth: false,
          language: 'en',
        },
        privacy: {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
        },
      };
      settings = await Settings.create(defaultSettings);
    }

    settings.privacy = {
      profileVisibility: profileVisibility || (settings.privacy?.profileVisibility || 'private'),
      showEmail: showEmail !== undefined ? showEmail : (settings.privacy?.showEmail || false),
      showPhone: showPhone !== undefined ? showPhone : (settings.privacy?.showPhone || false),
    };

    await settings.save();

    res.status(200).json({
      success: true,
      message: 'Privacy settings updated successfully',
      settings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
