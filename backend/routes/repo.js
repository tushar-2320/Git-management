const express = require('express');
const router = express.Router();
const { getRepositories, toggleAutoReview } = require('../controllers/repoController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, getRepositories);
router.post('/:id/toggle-auto-review', isAuthenticated, toggleAutoReview);

module.exports = router;

