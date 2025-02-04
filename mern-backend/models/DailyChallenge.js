const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    answerText: { type: String },
    answerFile: { type: String },
    submittedAt: { type: Date, default: Date.now }
});

const ChallengeSchema = new mongoose.Schema({
    // course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    question: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    // submissions: [SubmissionSchema]
});

module.exports = mongoose.model('DailyChallenge', ChallengeSchema);