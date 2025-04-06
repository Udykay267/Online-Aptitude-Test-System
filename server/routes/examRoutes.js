const express = require('express');
const router = express.Router();
const {
  getSubjects,
  submitResult,
  addSubject
} = require('../controllers/examController');

router.get('/subjects', getSubjects);
router.post('/submit', submitResult);
router.post('/admin/subject', addSubject); // Admin-only

module.exports = router;