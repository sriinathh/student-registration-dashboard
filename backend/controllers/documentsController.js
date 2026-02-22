const Document = require('../models/Document');

exports.getDocuments = async (req, res) => {
  try {
    const docs = await Document.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, documents: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createDocument = async (req, res) => {
  try {
    const { title, description } = req.body;
    let filePath = req.body.filePath || undefined;
    if (req.file) {
      // store relative path to serve
      filePath = `/uploads/documents/${req.file.filename}`;
    }
    const doc = await Document.create({ title, description, filePath, uploadedBy: req.userId });
    res.status(201).json({ success: true, document: doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
