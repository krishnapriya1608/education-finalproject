const express = require('express');
const Course = require('../models/Courses');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
const Enrollment=require('../models/Enrollment')
// Enroll a student in a course

// Backend Route
router.post('/enrollments', authenticateToken, async (req, res) => {
  const { category, userId } = req.body;

  try {
    // Check if the user has already enrolled in the course (category + userId)
    const existingEnrollment = await Enrollment.findOne({ category, userId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "You are already enrolled in this course." });
    }

    // Create a new enrollment
    const newEnrollment = new Enrollment({
      category,
      userId,
      enrollmentDate: new Date(),
    });

    await newEnrollment.save();

    res.status(200).json({ message: "Enrolled successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to enroll in the course." });
  }
});

// Example route to fetch enrolled courses for a user
router.get('/enrollments/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch the courses the user is enrolled in
    const enrollments = await Enrollment.find({ userId }).populate('category'); // Assuming 'category' is a reference to a course

    if (enrollments.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found." });
    }

    res.status(200).json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch enrolled courses." });
  }
});






// Fetch all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/progress/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
      const enrollments = await Enrollment.find({ userId }).populate("courseId");
      res.json(enrollments);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
 

module.exports = router;