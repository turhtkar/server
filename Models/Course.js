const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    whatsapp_group_link: String,
    drive_link: String,
    forum_link: String,
    registration_link: String,
    information: String,
    // add more fields as needed for your application
});

const Course = mongoose.model('course', courseSchema); // Use 'course' instead of 'Course'

module.exports = Course;
