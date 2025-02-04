const mongoose = require('mongoose');

const QuizQuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true } // Index of the correct option
});

const QuizSchema = new mongoose.Schema({
    category: { type: String, required: true },
    questions: [QuizQuestionSchema],
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', QuizSchema);
