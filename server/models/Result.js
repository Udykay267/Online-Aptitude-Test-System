const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: String,
  scores: [{ subject: String, score: Number }],
  passed: Boolean,
});

module.exports = mongoose.model('Result', resultSchema);