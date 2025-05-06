// Mengimpor Express dan membuat instance router 
// yang akan menampung semua rute terkait prodi
const express = require("express");
const router = express.Router();

// Mengimpor controller yang berisi fungsi-fungsi
// untuk menjalankan logika (ambil data, simpan, edit, hapus).
const prodiController = require("../controllers/prodiController");
const multer = require("multer");
const upload = multer(); // Berfungsi agar body > form-data dapat digunakan di Postman

// Rute untuk mendapatkan semua prodi
router.get("/", prodiController.getAllProdi);

// Rute untuk mendapatkan prodi berdasarkan ID
router.get("/:id", prodiController.getProdiById);

// Rute untuk membuat prodi baru
router.post("/", upload.none(), prodiController.createProdi);

// Rute untuk memperbarui prodi berdasarkan ID
router.put("/:id", prodiController.updateProdi);

// Rute untuk menghapus prodi berdasarkan ID
router.delete("/:id", prodiController.deleteProdi);

module.exports = router;
