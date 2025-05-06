const express = require("express");
const router = express.Router();
const jurusanController = require("../controllers/jurusanController");

// Mendapatkan semua jurusan
router.get("/", jurusanController.getAllJurusan);

// Mendapatkan jurusan berdasarkan ID
router.get("/:id", jurusanController.getJurusanById);

// Menambahkan jurusan baru
router.post("/", jurusanController.createJurusan);

// Memperbarui jurusan berdasarkan ID
router.put("/:id", jurusanController.updateJurusan);

// Menghapus jurusan berdasarkan ID
router.delete("/:id", jurusanController.deleteJurusan);

module.exports = router;
