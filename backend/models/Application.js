const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['open', 'closed', 'in-progress'], default: 'open' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', ApplicationSchema);
