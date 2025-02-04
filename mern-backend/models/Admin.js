const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },

  isApproved: {
    type: Boolean,
    default: false, 
  },
  role:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('admins', userSchema);
