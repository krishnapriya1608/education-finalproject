const mongoose = require('mongoose');
const User = require('./User');  // Correctly import the User model

const LectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref:'Courses',required: true },
    createdAt:{
       type:Date,
       default:Date.now,
    },
});


module.exports = mongoose.model('Lectures', LectureSchema);