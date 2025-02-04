
const mongoose= require('mongoose');
const CourseSchema = new mongoose.Schema({
    courseId: { type: String,  unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fees: { type: Number, required: true },
    duration: { type: String, required: true },
    category: { type: String, required: true, trim: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    video: { type: String, required: true },
    createdBy: { type: String, required: true },
    isCertified: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
   
  });
  
  module.exports = mongoose.model('courses', CourseSchema);
  