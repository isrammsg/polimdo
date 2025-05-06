// Mengimpor Express dan membuat instance router
// yang akan menampung semua rute terkait user
const express = require("express");
const router = express.Router();
// Mengimpor controller yang berisi fungsi-fungsi
// untuk menjalankan logika (ambil data, simpan, edit, hapus).
const userController = require("../controllers/userController");
const multer = require("multer");
const upload = multer(); //berkaitan dengan postman supaya bisa digunakan body >form-data untuk post
//kalau tidak menggunakan multer maka untuk post hanya bisa dengan body>raw>Json
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", upload.none(), userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
