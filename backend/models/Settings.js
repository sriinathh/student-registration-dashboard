const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    notifications: {
      emailNotifications: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true,
      },
      courseUpdates: {
        type: Boolean,
        default: true,
      },
      assignmentReminders: {
        type: Boolean,
        default: true,
      },
      gradeNotifications: {
        type: Boolean,
        default: true,
      },
    },
    preferences: {
      darkMode: {
        type: Boolean,
        default: false,
      },
      twoFactorAuth: {
        type: Boolean,
        default: false,
      },
      language: {
        type: String,
        default: 'en',
      },
    },
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'friends', 'private'],
        default: 'private',
      },
      showEmail: {
        type: Boolean,
        default: false,
      },
      showPhone: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);
