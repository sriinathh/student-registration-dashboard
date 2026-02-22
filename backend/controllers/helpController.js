const HelpArticle = require('../models/Help');

// @desc    Get all help articles by category
// @route   GET /api/help
// @access  Public
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await HelpArticle.find({ published: true })
      .sort({ category: 1, order: 1 })
      .select('-content');

    res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get articles by category
// @route   GET /api/help/category/:category
// @access  Public
exports.getByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const articles = await HelpArticle.find({ category, published: true })
      .sort({ order: 1 })
      .select('-content');

    res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get article by slug
// @route   GET /api/help/:slug
// @access  Public
exports.getArticle = async (req, res) => {
  try {
    const { slug } = req.params;

    const article = await HelpArticle.findOne({ slug, published: true });

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found',
      });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.status(200).json({
      success: true,
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Search help articles
// @route   GET /api/help/search
// @access  Public
exports.searchArticles = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Please provide search query',
      });
    }

    const articles = await HelpArticle.find(
      {
        published: true,
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { excerpt: { $regex: q, $options: 'i' } },
          { content: { $regex: q, $options: 'i' } },
        ],
      },
      '-content'
    );

    res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Create help article (Admin only)
// @route   POST /api/help/admin/create
// @access  Private/Admin
exports.createArticle = async (req, res) => {
  try {
    const { title, category, content, excerpt, order } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, category, and content',
      });
    }

    const article = await HelpArticle.create({
      title,
      category,
      content,
      excerpt: excerpt || content.substring(0, 150),
      order: order || 0,
    });

    res.status(201).json({
      success: true,
      message: 'Article created successfully',
      article,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
