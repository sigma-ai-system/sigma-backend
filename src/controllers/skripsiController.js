const Skripsi = require('../models/skripsiModel');

// @desc    Create data skripsi baru
// @route   POST /api/skripsi
// @access  Private
const createSkripsi = async (req, res) => {
  try {
    // Tambahkan id user yang sedang login ke dalam data yang akan disimpan
    const dataSkripsi = {
      ...req.body,
      user: req.user.id,
    };

    const skripsi = await Skripsi.create(dataSkripsi);
    res.status(201).json({ success: true, data: skripsi });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all data skripsi (milik user yang login)
// @route   GET /api/skripsi
// @access  Private
const getAllSkripsi = async (req, res) => {
  try {
    const skripsi = await Skripsi.find({ user: req.user.id });
    res.status(200).json({ success: true, count: skripsi.length, data: skripsi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get data skripsi berdasarkan ID
// @route   GET /api/skripsi/:id
// @access  Private
const getSkripsiById = async (req, res) => {
  try {
    const skripsi = await Skripsi.findOne({ _id: req.params.id, user: req.user.id });

    if (!skripsi) {
      return res.status(404).json({ success: false, message: 'Data skripsi tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: skripsi });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update data skripsi secara penuh (PUT)
// @route   PUT /api/skripsi/:id
// @access  Private
const updateSkripsiPut = async (req, res) => {
  try {
    const { progres_skripsi, frekuensi_bimbingan_bulanan, keterlambatan_milestone_hari, streak_aktivitas_mingguan, jumlah_revisi_aktif } = req.body;

    // Validasi dasar untuk PUT: Memastikan semua field wajib dikirim
    if (progres_skripsi === undefined || frekuensi_bimbingan_bulanan === undefined || keterlambatan_milestone_hari === undefined || streak_aktivitas_mingguan === undefined || jumlah_revisi_aktif === undefined) {
      return res.status(400).json({ success: false, message: 'Lengkapi semua field untuk pembaruan penuh (PUT)' });
    }

    const skripsi = await Skripsi.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { progres_skripsi, frekuensi_bimbingan_bulanan, keterlambatan_milestone_hari, streak_aktivitas_mingguan, jumlah_revisi_aktif },
      { new: true, runValidators: true }
    );

    if (!skripsi) {
      return res.status(404).json({ success: false, message: 'Data skripsi tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: skripsi });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update data skripsi secara parsial (PATCH)
// @route   PATCH /api/skripsi/:id
// @access  Private
const updateSkripsiPatch = async (req, res) => {
  try {
    // PATCH hanya memperbarui field yang dikirim di req.body
    const skripsi = await Skripsi.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!skripsi) {
      return res.status(404).json({ success: false, message: 'Data skripsi tidak ditemukan' });
    }

    res.status(200).json({ success: true, data: skripsi });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete data skripsi
// @route   DELETE /api/skripsi/:id
// @access  Private
const deleteSkripsi = async (req, res) => {
  try {
    const skripsi = await Skripsi.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!skripsi) {
      return res.status(404).json({ success: false, message: 'Data skripsi tidak ditemukan' });
    }

    res.status(200).json({ success: true, message: 'Data skripsi berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createSkripsi,
  getAllSkripsi,
  getSkripsiById,
  updateSkripsiPut,
  updateSkripsiPatch,
  deleteSkripsi,
};