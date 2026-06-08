const express = require('express');
const router = express.Router();
const userController = require('./user');

// Define API routes and map them to controllers
router.use('/users', userController);

module.exports = router;