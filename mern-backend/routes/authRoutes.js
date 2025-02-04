const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../middleware/sendMail');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Register


// Registration route for teachers (with admin approval process)
router.post('/register', async (req, res) => {
  const { name, email, password, role, rollNumber, class: className, teacherId, subject } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (role === 'student' && (!rollNumber || !className)) {
    return res.status(400).json({ message: "Missing roll number or class for student" });
  }

  if (role === 'teacher' && (!teacherId || !subject)) {
    return res.status(400).json({ message: "Missing teacher ID or subject for teacher" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role.trim(),
      rollNumber,
      class: className,
      teacherId,
      subject,
      isApproved: role === 'teacher' ? false : true, // Teachers need admin approval
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const activationToken = jwt.sign({
      name: newUser.name,
      email: newUser.email,
      otp,
    }, process.env.JWT_SECRET, { expiresIn: "20m" });

    await newUser.save();

    // If teacher, return with approval pending status
    if (role === 'teacher') {
      return res.status(201).json({
        message: 'Teacher registration pending approval by admin',
        isApproved: newUser.isApproved,
        activationToken,  
      });
    }

    // If student, send OTP immediately
    await sendEmail(email, "E-learning", 'OTP for activation', { name, otp }, teacherId);
    
    res.status(201).json({
      message: 'OTP sent to your mail',
      activationToken,  
      teacherId,
    });

  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});










// Verify Token
router.post('/verify-otp', async (req, res) => {
  const { otp, activationToken } = req.body;

  try {
    const verify = jwt.verify(activationToken, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(400).json({ message: "OTP Expired" });
    }

    if (verify.otp !== otp) {
      return res.status(400).json({ message: "Wrong OTP" });
    }

    const user = await User.findOneAndUpdate(
      { email: verify.email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User verified successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// Login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
          { id: user._id, role: user.role }, // Include user role in the token
          process.env.Acti_secret,
          { expiresIn: '24h' }
      );

      console.log('Generated Token:', token); // Log the token for debugging purposes

      // Determine role-based dashboard URL
      let dashboardUrl = '/dash'; // Default dashboard URL
      if (user.role === 'teacher') {
          dashboardUrl = '/insta'; // Redirect teacher to instructor dashboard
      }

      // Return response with user info, token, and dashboard URL
      res.status(200).json({
          message: `Welcome back ${user.name}`,
          user,
          token, // Include token in the response for client-side use
          dashboardUrl
      });
  } catch (err) {
      console.error('Login Error:', err); // Log server-side error
      res.status(500).json({ message: 'Server error', error: err.message });
  }
});








router.get('/myProfile', authenticateToken, async (req, res) => {
    try {
        const user = req.user; 
        // if (!user) {
        //     return res.status(404).json({ message: 'User not found' });
        // }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});





module.exports = router;


