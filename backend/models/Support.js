const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide message'],
    },
    category: {
      type: String,
      enum: ['technical', 'billing', 'general', 'other'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['open', 'in-progress', 'resolved', 'closed'],
      default: 'open',
    },
    replies: [
      {
        message: String,
        repliedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        repliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Support', supportSchema);
