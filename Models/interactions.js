// models/Interaction.js
const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  videoId: { type: String, required: true },
  questionId: { type: String, required: true },
  selectedOption: { type: String, required: true },
  correct: { type: Boolean, required: true },
  timestamp: { type: Date, default: Date.now }
},{ collection: 'Interactions' });

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
