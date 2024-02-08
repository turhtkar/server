const mongoose = require('mongoose');

const HistogramSchema = mongoose.Schema({
    courseId: String,
    semester: String,
    histogramURL: String,
    data: [
        {
            range: String,
            students: Number,
            percentage: Number,
            cumulativePercentage: Number
        }
    ]
});

module.exports = mongoose.model('Histograms', HistogramSchema);
