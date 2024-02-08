const mongoose = require('mongoose');

const semesterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    coursesOffered: [String] // Array of course codes
});

const Semester = mongoose.model('semester', semesterSchema); // Use 'semester' instead of 'Semester'

module.exports = Semester;
