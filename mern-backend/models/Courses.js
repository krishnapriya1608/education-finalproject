const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },  enrolledStudents: {
    type: [String],
    default: []  // Ensure this field defaults to an empty array
  },
 
  category: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

});

module.exports = mongoose.model("Data", schema);