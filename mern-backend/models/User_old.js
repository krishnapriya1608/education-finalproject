const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'parent'], required: true },
    rollNumber: { type: String, required: function () { return this.role === 'student'; } },
    class: { type: String, required: function () { return this.role === 'student'; } },
    teacherId: { type: String, required: function () { return this.role === 'teacher'; } },
    subject: { type: String, required: function () { return this.role === 'teacher'; } },
    childReference: { type: String, required: function () { return this.role === 'parent'; } },
    relationship: { type: String, required: function () { return this.role === 'parent'; } }
});

module.exports = mongoose.model('User', UserSchema);