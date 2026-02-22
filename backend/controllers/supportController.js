const Support = require('../models/Support');
const User = require('../models/User');

// @desc    Create support ticket
// @route   POST /api/support
// @access  Private
exports.createTicket = async (req, res) => {
  try {
    const { name, email, subject, message, category } = req.body;

    // Validate
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const ticket = await Support.create({
      userId: req.userId,
      name,
      email,
      subject,
      message,
      category: category || 'general',
    });

    res.status(201).json({
      success: true,
      message: 'Support ticket created successfully!',
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get user's support tickets
// @route   GET /api/support/my-tickets
// @access  Private
exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await Support.find({ userId: req.userId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get ticket by ID
// @route   GET /api/support/:id
// @access  Private
exports.getTicket = async (req, res) => {
  try {
    const ticket = await Support.findById(req.params.id).populate('userId', 'name email');

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Check if user owns this ticket or is admin
    if (ticket.userId._id.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this ticket',
      });
    }

    res.status(200).json({
      success: true,
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Add reply to support ticket
// @route   POST /api/support/:id/reply
// @access  Private
exports.addReply = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a reply message',
      });
    }

    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    // Check if user owns this ticket or is admin
    if (ticket.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to reply to this ticket',
      });
    }

    ticket.replies.push({
      message,
      repliedBy: req.userId,
      repliedAt: new Date(),
    });

    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Reply added successfully',
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Close support ticket
// @route   PUT /api/support/:id/close
// @access  Private
exports.closeTicket = async (req, res) => {
  try {
    const ticket = await Support.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found',
      });
    }

    if (ticket.userId.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to close this ticket',
      });
    }

    ticket.status = 'closed';
    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Ticket closed successfully',
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
