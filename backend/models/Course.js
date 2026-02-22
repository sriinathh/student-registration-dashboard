const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    instructor: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
