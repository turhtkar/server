// Guidance.js (server/models/Guidance.js)

const mongoose = require('mongoose');

const guidanceSchema = new mongoose.Schema({
    course_id: { type: String, required: true },
    semester_id: { type: String, required: true },
    course_type: String,
    course_hours: String,
    guidance_type: String,
    day_of_week: String,
    course_location: String,
    study_group: String,
    isFull: String,
    instructor_id: String,
});

const Guidance = mongoose.model('Guidance', guidanceSchema);

module.exports = Guidance;
