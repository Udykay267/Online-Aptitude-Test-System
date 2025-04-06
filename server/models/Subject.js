const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: String,
  questionCount: Number,
  timeLimitMinutes: Number,
});

module.exports = mongoose.model('Subject', subjectSchema);