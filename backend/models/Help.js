const mongoose = require('mongoose');

const helpArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      enum: ['getting-started', 'courses', 'assignments', 'grades', 'profile', 'technical', 'billing'],
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    excerpt: {
      type: String,
    },
    icon: {
      type: String,
      default: 'HelpCircle',
    },
    order: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title
helpArticleSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('HelpArticle', helpArticleSchema);
