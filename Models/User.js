const mongoose = require('mongoose');

// the mongoDb user Schematic
const userSchema = new mongoose.Schema({
    googleId: String,
    name: String,
    email: String,
    semesters: [{
        semesterReference: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Semester'
        },
        events: [{
            start: Date,
            end: Date,
            title: String,
            courseId: String,
            courseName: String
        }]
    }]
});

const User = mongoose.model('User', userSchema); // Use 'course' instead of 'Course'

module.exports = User;