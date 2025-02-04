const express = require('express');
const Quiz = require('../models/Quiz');
const QuizResult = require('../models/QuizResult');
const Course = require('../models/Course');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const router = express.Router();

// Add quiz questions (only teachers)
router.post('/add', authenticateToken, authorizeRole('teacher'), async (req, res) => {
    const { category, questions } = req.body;

    try {
        // Check if course exists
        const course = await Course.findOne();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const newQuiz = new Quiz({
            category: category,
            questions,
            teacher: req.user.id,
        });

        await newQuiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz: newQuiz });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Get random quiz questions for a course
router.get('/getquiz', authenticateToken, async (req, res) => {
    try {
        const quiz = await Quiz.find(); // Fetching all quizzes
console.log('Fetched quiz:', quiz);  
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// Submit quiz answers and calculate score
router.post('/submit', authenticateToken, async (req, res) => {
  const { answers, quizId, teacher } = req.body;

  try {
    if (!quizId || !teacher) {
      return res.status(400).json({ message: 'Quiz ID and Teacher ID are required' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    // 🟢 Save the quiz result
    const quizResult = new QuizResult({
      student: req.user.id,
      teacher: teacher,
      quizId: quizId,
      score: score,
    });

    console.log("Saving quiz result:", quizResult); // Debugging log

    await quizResult.save();

    res.status(200).json({ message: 'Quiz submitted successfully', score });

  } catch (err) {
    console.error('Error submitting quiz:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.get('/student/score', authenticateToken, async (req, res) => {
  try {
    const quizResults = await QuizResult.find({ student: req.user.id }).sort({ submittedAt: -1 });

    if (!quizResults || quizResults.length === 0) {
      return res.status(404).json({ message: "No quiz results found" });
    }

    res.status(200).json({ score: quizResults[0].score }); // Latest quiz score
  } catch (err) {
    console.error("Error fetching score:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});




module.exports = router;