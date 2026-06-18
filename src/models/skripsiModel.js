const mongoose = require('mongoose');

const skripsiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    progres_skripsi: {
      type: Number,
      default: 0,
      min: [0, 'Progres tidak bisa kurang dari 0'],
      max: [100, 'Progres tidak bisa lebih dari 100'],
    },
    frekuensi_bimbingan_bulanan: {
      type: Number,
      default: 0,
    },
    keterlambatan_milestone_hari: {
      type: Number,
      default: 0,
    },
    streak_aktivitas_mingguan: {
      type: Number,
      default: 0,
    },
    jumlah_revisi_aktif: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skripsi', skripsiSchema);