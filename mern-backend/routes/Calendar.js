const Calendar=require('../models/Calendar');
const express=require('express');
const router=express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/create', authenticateToken, authorizeRole('teacher'), async (req, res) => {
  try {
    const { title, description, date, createdBy ,time1,time2} = req.body;

    // Use current date if 'date' is not provided

    if (!title || !description|| !date || !createdBy||!time1||!time2) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newEvent = new Calendar({
      title,
      description,
      date,
      createdBy,
      time1,
      time2,
    });

    await newEvent.save();

    res.status(201).json({
      message: 'Event created successfully!',
      event: newEvent,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Debugging the GET /calendar route
router.get('/calendar', authenticateToken, authorizeRole('student'), async (req, res) => {
  try {
    const events = await Calendar.find({});  // Temporarily remove the filtering
    console.log('Fetched events:', events);  // Check if any events are returned
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;


