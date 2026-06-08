const User = require('../models/userModel');

// Helper function untuk mengirim response token
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ success: true, token });
};

// @desc    Register user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi email & password ada
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // Cek user di database (tambahkan .select('+password') karena defaultnya hidden)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Cek apakah password cocok
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Logout user
// @route   GET /api/auth/logout
const logout = async (req, res) => {
  // Konsep logout JWT yang stateless umumnya di-handle di sisi client (frontend).
  // Frontend cukup menghapus token dari LocalStorage atau memori.
  // Dari sisi server, kita cukup mengembalikan response sukses.
  res.status(200).json({ success: true, message: 'Logged out successfully. Please remove token on client side.' });
};

module.exports = {
  register,
  login,
  logout,
};