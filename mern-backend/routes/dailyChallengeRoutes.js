const express = require('express');
const multer = require('multer');
const DailyChallenge = require('../models/DailyChallenge');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();


// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Create a daily challenge (only teachers)
router.post('/create', authenticateToken, authorizeRole('teacher'), async (req, res) => {
    const {  question,submissions } = req.body;

    try {
        const newChallenge = new DailyChallenge({
           
            question,
            teacher: req.user.id,
            submissions,

        });

        await newChallenge.save();
        res.status(201).json({ message: 'Daily challenge created successfully', challenge: newChallenge });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Submit an answer to a challenge
router.post('/:challengeId/submit', authenticateToken, upload.single('answerFile'), async (req, res) => {
    try {
        const { challengeId } = req.params;
        const { answerText, teacher } = req.body;
        const answerFile = req.file ? req.file.path : null;

        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        // Find challenge
        const challenge = await DailyChallenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        // Ensure submissions array exists
        if (!challenge.submissions) {
            challenge.submissions = [];
        }

        // Push submission
        challenge.submissions.push({
            student: req.user.id,
            answerText,
            answerFile,
            teacher,
        });

        await challenge.save();
        res.status(200).json({ message: "Answer submitted successfully", challenge });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});



// View submissions for a challenge (only teachers)
router.get('/:challengeId/submissions', authenticateToken, authorizeRole('teacher'), async (req, res) => {
    const { challengeId } = req.params;

    try {
        const challenge = await DailyChallenge.findById(challengeId).populate('submissions.student', 'name email').populate('course', 'name');
        if (!challenge) return res.status(404).json({ message: 'Challenge not found' });

        res.status(200).json(challenge.submissions);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});
router.get('/challenges', async (req, res) => {
    try {
      const challenges = await DailyChallenge.find();
      res.json(challenges);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  router.get('/submitted-count', authenticateToken, async (req, res) => {
    try {
      const userId = req.user._id; // Get user from token
  
      // Query the DailyChallenge model to count submissions for this user
      const submittedAssignments = await DailyChallenge.countDocuments({
        'submissions.student': userId, // Find challenges with submissions from this user
      });
  
      res.json({ count: submittedAssignments });
    } catch (error) {
      console.error('Error fetching submitted assignments count:', error);
      res.status(500).json({ message: 'Error fetching submitted assignments count' });
    }
  });
  // Backend route to check if the student has submitted the answer
router.get('/check-submission-status/:challengeId', authenticateToken, async (req, res) => {
    try {
      const userId = req.user._id; // Get user from token
      const challengeId = req.params.challengeId; // Get the challenge ID from the URL
  
      // Check if a submission exists for the student and challenge
      const submission = await Submission.findOne({ student: userId, challenge: challengeId });
      
      if (submission) {
        res.json({ isAnswered: true });
      } else {
        res.json({ isAnswered: false });
      }
    } catch (error) {
      console.error("Error checking submission status:", error);
      res.status(500).json({ message: 'Error checking submission status' });
    }
  });
  


module.exports = router;