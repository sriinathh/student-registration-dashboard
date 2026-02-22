const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    grade: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Grade', GradeSchema);
