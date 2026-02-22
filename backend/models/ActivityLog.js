const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: ['CREATE', 'READ', 'UPDATE', 'DELETE', 'LOGIN', 'EXPORT', 'FILTER', 'SEARCH'],
      required: true,
    },
    entity: {
      type: String,
      enum: ['STUDENT', 'PROFILE', 'SETTINGS', 'SUPPORT', 'AUTH'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    entityId: {
      type: String,
      default: null,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    ipAddress: String,
    userAgent: String,
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED'],
      default: 'SUCCESS',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, entity: 1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
