const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { getUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/logout', logout);

// Protected Routes (Hanya bisa diakses jika memiliki token yang valid)
router.get('/users', protect, getUsers);

module.exports = router;