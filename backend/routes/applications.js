const express = require('express');
const { getApplications, createApplication, updateApplication } = require('../controllers/applicationsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, getApplications);
router.post('/', protect, createApplication);
router.put('/:id', protect, updateApplication);

module.exports = router;
