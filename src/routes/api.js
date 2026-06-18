const express = require('express');
const router = express.Router();

// Import Auth Controllers & Middleware
const { register, login, logout } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Import Skripsi Controllers
const {
  createSkripsi,
  getAllSkripsi,
  getSkripsiById,
  updateSkripsiPut,
  updateSkripsiPatch,
  deleteSkripsi
} = require('../controllers/skripsiController');

// --- Auth Routes ---
router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/logout', logout);

// --- Skripsi CRUD Routes (Semua diproteksi dengan JWT) ---
router.route('/skripsi')
  .post(protect, createSkripsi)
  .get(protect, getAllSkripsi);

router.route('/skripsi/:id')
  .get(protect, getSkripsiById)
  .put(protect, updateSkripsiPut)
  .patch(protect, updateSkripsiPatch)
  .delete(protect, deleteSkripsi);

module.exports = router;