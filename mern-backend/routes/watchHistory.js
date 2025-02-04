const express = require('express');
const router = express.Router();
const User=require('../models/User')
const Course = require('../models/Course');

// Function to update watch history
const addToWatchHistory = async (userId, courseId) => {
  try {
    // Ensure that the user doesn't have the course in the watch history already
    const user = await User.findById(userId);
    if (!user.watchHistory.includes(courseId)) {
      // Add course to watch history
      await User.findByIdAndUpdate(userId, {
        $push: { watchHistory: courseId }
      });
      console.log("Course added to watch history");
    }
  } catch (error) {
    console.error("Error adding to watch history:", error);
  }
};

// Route to get watch history
router.get('/watch-history', async (req, res) => {
  try {
    const userId = req.user._id; // Get the logged-in user
    const user = await User.findById(userId).populate('watchHistory'); // Populate with course details
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ watchHistory: user.watchHistory });
  } catch (error) {
    console.error("Error fetching watch history:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to add course to watch history
router.post('/add-to-watch-history', async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id; // Get the logged-in user

    // Call function to update watch history
    await addToWatchHistory(userId, courseId);

    res.status(200).json({ message: 'Course added to watch history' });
  } catch (error) {
    console.error("Error adding to watch history:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
