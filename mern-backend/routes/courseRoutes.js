const express = require('express');
const Course = require('../models/Course');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();
const multerMiddleware = require('../middleware/multerMiddleware')
const Lecture = require('../models/Learning');
const path = require('path');
const mongoose=require('mongoose')
const User=require('../models/User')
const Courses=require('../models/Courses')

// Add a course (only teachers)
router.post('/courseadd', authenticateToken, multerMiddleware, authorizeRole('teacher'), async (req, res) => {
  console.log('Inside add');
  const { name, description, fees, duration, createdBy,category, isCertified, startDate, endDate } = req.body;
  console.log(req.body);
  const image = req.files?.image?.[0]?.path || null;
  const video = req.files?.video?.[0]?.path || null;

  try {
    const existingproject = await Course.findOne({ name })
    if (existingproject) {
      return res.status(400).json({ message: 'Project already exists' });
    }
    else {

      const newCourse = new Course({
        name,
        description,
        fees,
        duration,
        category:category,
        isCertified,
        image,
        video,
        teacher: req.user.id,
        createdBy,
        startDate,
        endDate,
      });
      await newCourse.save();
      return res.status(200).json({ message: 'Course added successfully', course: newCourse });
    }
  } catch (err) {
    console.error('Error adding course:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.get('/:id', authenticateToken, authorizeRole('teacher'), async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid course ID format.' });
    }

    // Find the course by its ObjectId
    const course = await Course.findById(id);

    // Check if course exists
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/certified', async (req, res) => {
  console.log("inside certified page");
  
  try {
      const certifiedCourses = await Course.find({ isCertified: true });
      res.status(200).json(certifiedCourses);
  } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Route to fetch all courses for teachers and only enrolled courses for students
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Check if the user is a teacher or a student
    const isTeacher = req.user.role === 'teacher';

    // If the user is a teacher, return all courses
    if (isTeacher) {
      const courses = await Course.find().populate('teacher', 'name email');
      return res.status(200).json(courses);
    }

    // If the user is a student, return only the courses they are enrolled in
    const studentCourses = await Courses.find({
      enrolledStudents: req.user.id, // Only fetch courses where the user is enrolled
    }).populate('teacher', 'name email');

    if (studentCourses.length === 0) {
      return res.status(404).json({ message: 'No courses found for this student' });
    }

    res.status(200).json(studentCourses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


router.delete('/:id', authenticateToken, authorizeRole('teacher'), async (req, res) => {
    try {
        const courseId = req.params.id;
    
        const course = await Course.findById(courseId);
    
        if (!course) {
          return res.status(404).json({ message: 'Course not found' });
        }
    
        if (course.teacher.toString() !== req.user.id) {
          return res.status(403).json({ message: 'Access denied: You can only delete your own courses' });
        }
    
        // Delete the course
        await Course.findByIdAndDelete(courseId);
    
        res.status(200).json({ message: 'Course deleted successfully' });
      } catch (err) {
        console.error('Error deleting course:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
});


router.put('/api/courses/:courseId', authenticateToken, async (req, res) => {
  const { courseId } = req.params;
  const { name, description, fees, duration, startDate, endDate } = req.body; // Destructure the incoming data

  try {
    // Find the course by ID and update it
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    // Check if the logged-in user is the teacher who created the course (optional)
   

    // Update the course fields
    course.name = name || course.name;
    course.description = description || course.description;
    course.fees = fees || course.fees;
    course.duration = duration || course.duration;
    course.startDate = startDate || course.startDate;
    course.endDate = endDate || course.endDate;

    // Save the updated course
    await course.save();
    
    res.status(200).json({ message: "Course updated successfully.", course });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Failed to update course." });
  }
});






module.exports = router;