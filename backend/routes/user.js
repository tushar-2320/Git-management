const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/profile', isAuthenticated, getProfile);

module.exports = router;

