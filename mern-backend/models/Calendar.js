// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
 


  createdBy: {
    type: String,
    required: true,
  },
  time1:{
    type:String,
    required:true,
    
    
  },
  time2:{
    type:String,
    required:true
  }

}, 
);


const Event = mongoose.model('Calendar', eventSchema);

module.exports = Event;
