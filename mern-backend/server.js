require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const eventRoutes = require('./routes/eventRoutes');
const chatRoutes = require('./routes/chatRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const dailyChallengeRoutes = require('./routes/dailyChallengeRoutes');
const quizRoutes = require('./routes/quizRoutes');
const Course=require('./routes/Course');
const calendar=require('./routes/Calendar');
const Admin=require('./routes/adminRoutes')
const watch=require('./routes/watchHistory');
const path = require('path');

connectDB();

  
  

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/course', Course);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/daily-challenges', dailyChallengeRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/calendar', calendar);
app.use('/api/admin', Admin);
app.use('/api/watch', watch);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


const PORT = process.env.PORT || 5020;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/',(req,res)=>{
    res.send("server started")
})
