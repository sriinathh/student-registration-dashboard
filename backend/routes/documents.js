const express = require('express');
const multer = require('multer');
const path = require('path');
const { getDocuments, createDocument, deleteDocument } = require('../controllers/documentsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// multer storage for document files
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, '..', 'uploads', 'documents'));
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
	},
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.get('/', protect, getDocuments);
// Accept multipart/form-data with field 'file'
router.post('/', protect, upload.single('file'), createDocument);
router.delete('/:id', protect, deleteDocument);

module.exports = router;
