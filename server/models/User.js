const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,
  email: String,
  name: String,
  role: { type: String, default: 'candidate' }
});

module.exports = mongoose.model('User', userSchema);