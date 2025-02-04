const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'parent', 'admin'], required: true },
    isVerified: { type: Boolean, default: true },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isApproved: { type: Boolean, default: false },  // Add this field to track approval status
    subscription: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    ],
    watchHistory: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",  // Courses the user has watched
        }
    ]
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
