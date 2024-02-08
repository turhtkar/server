const mongoose = require('mongoose');

// Define a schema for course
const courseSchema = new mongoose.Schema({
    courseId: String,
    courseName: String,
    points: String
});

// Define a schema for group
const groupSchema = new mongoose.Schema({
    relationship: String,
    items: [{
        type: { type: String, enum: ['course', 'group'] },
        item: mongoose.Schema.Types.Mixed
    }]
});

// Define a schema for subcategory
const subCategorySchema = new mongoose.Schema({
    name: String,
    type: String,
    requiredCredits: String,
    items: [{
        type: { type: String, enum: ['course', 'group'] },
        item: mongoose.Schema.Types.Mixed
    }]
});

// Define a schema for category
const categorySchema = new mongoose.Schema({
    name: String,
    type: String,
    requiredCredits: String,
    subCategories: [subCategorySchema],
    items: [{
        type: { type: String, enum: ['course', 'group'] },
        item: mongoose.Schema.Types.Mixed
    }]
});

// Define the main degree schema
const degreeSchema = new mongoose.Schema({
    degree_name: String,
    total_credits: String,
    courseCategories: [categorySchema]
});

const Degree = mongoose.model('degree', degreeSchema); 

module.exports = Degree;
