const express = require('express');
const multerMiddleware = require('../middleware/multerMiddleware')
const Event = require('../models/Event');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();



// Create an event (only teachers)
router.post('/create', authenticateToken,multerMiddleware, authorizeRole('teacher'), async (req, res) => {
    const { name, description, date } = req.body;
  
    try {
        const newEvent = new Event({
            name,
            description,
            date,
            teacher: req.user.id
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all upcoming events
router.get('/upcoming', authenticateToken,authorizeRole('student'), async (req, res) => {
    try {
        const currentDate = new Date().toISOString();
    
        const events = await Event.find({ date: { $gte: currentDate } }).populate('teacher', 'name email');
        console.log("Current Date:", currentDate);
console.log("Event Dates:", await Event.find({}, { date: 1, _id: 0 }));

        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;