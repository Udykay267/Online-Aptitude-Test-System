const express = require('express');
const router = express.Router();
const { verifyUser } = require('../controllers/authController');

router.get('/verify', verifyUser);

module.exports = router;