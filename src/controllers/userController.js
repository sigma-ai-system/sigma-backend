const User = require('../models/userModel');

// @desc    Get all users
// @route   GET /api/users
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetches all documents from 'users' collection
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new user
// @route   POST /api/users
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const user = await User.create({ name, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


const login = async (req, res) => {
    
}

module.exports = {
  getUsers,
  createUser,
};