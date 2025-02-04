const express = require('express');
const Message = require('../models/Chat');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Send a message
router.post('/send', authenticateToken, async (req, res) => {
    const { recipientId, message } = req.body;

    try {
        const newMessage = new Message({
            sender: req.user.id,
            recipient: recipientId,
            message
        });

        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully', chat: newMessage });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get chat messages between student and teacher
router.get('/:recipientId', authenticateToken, async (req, res) => {
    const { recipientId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user.id, recipient: recipientId },
                { sender: recipientId, recipient: req.user.id }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;