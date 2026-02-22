const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const path = require('path');
const app = express();

// Middleware
app.use(cors());
// Increase payload size limits to allow base64 avatar uploads (up to ~6MB)
app.use(express.json({ limit: '6mb' }));
app.use(express.urlencoded({ extended: true, limit: '6mb' }));

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/student-dashboard')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/students', require('./routes/students'));
app.use('/api/support', require('./routes/support'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/help', require('./routes/help'));
app.use('/api/activity-logs', require('./routes/activity'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/academic', require('./routes/academic'));
app.use('/api/applications', require('./routes/applications'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Debug info (shows mongoose connection state and env helpful for diagnosing 500s)
app.get('/api/debug', (req, res) => {
  try {
    const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected
    res.status(200).json({
      success: true,
      mongooseState: state,
      mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/student-dashboard',
      nodeEnv: process.env.NODE_ENV || 'development',
    });
  } catch (err) {
    console.error('debug endpoint error:', err);
    res.status(500).json({ success: false, message: 'debug error', error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error',
  });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads/documents exists (create folder if missing)
const fs = require('fs');
const docsDir = path.join(__dirname, 'uploads', 'documents');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
