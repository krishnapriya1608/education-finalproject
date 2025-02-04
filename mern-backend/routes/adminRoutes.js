
const express = require('express');
const {authenticate, isAdminOrSuperAdmin}=require('../middleware/Authenticate')
const router = express.Router();
const User=require('../models/Admin')
const Users=require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/admin/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check if required fields are provided
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Only allow registration for "admin" role
  if (role !== 'admin') {
    return res.status(400).json({ message: 'Only admin can be registered' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role, 
      isApproved: true, 
    });

    // Save the new user to the database
    await newUser.save();

    // Optionally, you can generate a JWT token for the newly registered admin
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // Set expiration as per your requirement
    );

    // Respond with success and token
    res.status(201).json({
      message: 'Admin registered successfully',
      token, // You can send the token or just the confirmation message
    });

  } catch (err) {
    console.error("Error during admin registration:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET, // Secret from environment variables
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      message: 'Login successful',
      token,  // Send the token back in the response
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});




// Admin or Super Admin can approve a teacher
router.put('/approve-teacher/:userId', authenticate, isAdminOrSuperAdmin, async (req, res) => {
  const userId = req.params.userId;
  console.log("Received userId:", userId); // Debugging

  if (!userId) {
    return res.status(400).json({ message: 'User ID is missing' });
  }

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    user.isApproved = true;
    const updatedUser = await user.save();
    console.log("Teacher approved:", updatedUser);

    res.status(200).json({
      message: 'Teacher approved successfully',
      teacher: updatedUser,
    });
  } catch (err) {
    console.error("Error approving teacher:", err);
    res.status(500).json({ message: 'Error approving teacher', error: err.message });
  }
});











  
  // Admin rejects a teacher
  router.put('/reject-teacher/:userId', authenticate, isAdminOrSuperAdmin, async (req, res) => {
    try {
      const user = await Users.findById(req.params.userId);
      if (!user || user.role !== 'teacher') {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      await user.remove(); // Remove the teacher from the database
      res.status(200).json({ message: 'Teacher rejected and removed' });
    } catch (err) {
      res.status(500).json({ message: 'Error rejecting teacher', error: err.message });
    }
  });
// Backend fetch teachers logic
router.get('/teachers', authenticate, isAdminOrSuperAdmin, async (req, res) => {
  try {
      const teachers = await Users.find({ role: 'teacher' }); // Fetch all teachers, regardless of approval status
      res.status(200).json(teachers);
  } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ message: 'Error fetching teachers' });
  }
});

  module.exports = router;