const express = require('express');
const {
  getAllArticles,
  getByCategory,
  getArticle,
  searchArticles,
  createArticle,
} = require('../controllers/helpController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllArticles);
router.get('/search', searchArticles);
router.get('/category/:category', getByCategory);
router.get('/:slug', getArticle);

// Admin routes
router.post('/admin/create', protect, createArticle);

module.exports = router;
