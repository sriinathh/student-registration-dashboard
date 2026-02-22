const express = require('express');
const {
  createTicket,
  getMyTickets,
  getTicket,
  addReply,
  closeTicket,
} = require('../controllers/supportController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', protect, createTicket);
router.get('/my-tickets', protect, getMyTickets);
router.get('/:id', protect, getTicket);
router.post('/:id/reply', protect, addReply);
router.put('/:id/close', protect, closeTicket);

module.exports = router;
