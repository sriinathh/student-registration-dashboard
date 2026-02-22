const Application = require('../models/Application');

exports.getApplications = async (req, res) => {
  try {
    const apps = await Application.find().populate('student', 'name rollNumber').sort({ createdAt: -1 });
    res.status(200).json({ success: true, applications: apps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createApplication = async (req, res) => {
  try {
    const { type, message } = req.body;
    const app = await Application.create({ student: req.userId, type, message });
    res.status(201).json({ success: true, application: app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!app) return res.status(404).json({ success: false, message: 'Application not found' });
    res.status(200).json({ success: true, application: app });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
