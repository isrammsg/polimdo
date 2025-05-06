const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mendapatkan semua jurusan
exports.getAllJurusan = async (req, res) => {
    try {
        const jurusan = await prisma.jurusan.findMany({
            include: { prodis: true, users: true },
        });
        res.status(200).json({ success: true, data: jurusan });
    } catch (error) {
        console.error("Error fetching jurusan:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat mengambil data jurusan." });
    }
};

// Mendapatkan jurusan berdasarkan ID
exports.getJurusanById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: "ID tidak valid." });
        }

        const jurusan = await prisma.jurusan.findUnique({
            where: { id },
            include: { prodis: true, users: true },
        });

        if (!jurusan) {
            return res.status(404).json({ success: false, error: "Jurusan tidak ditemukan." });
        }

        res.status(200).json({ success: true, data: jurusan });
    } catch (error) {
        console.error("Error fetching jurusan:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat mengambil data jurusan." });
    }
};

// Menambahkan jurusan baru
exports.createJurusan = async (req, res) => {
    try {
        const { nama_jurusan, ketua_jurusan } = req.body;

        // Validasi input
        if (!nama_jurusan || !ketua_jurusan) {
            return res.status(400).json({ success: false, error: "Semua field harus diisi." });
        }

        const newJurusan = await prisma.jurusan.create({
            data: {
                nama_jurusan,
                ketua_jurusan,
            },
        });

        res.status(201).json({ success: true, data: newJurusan });
    } catch (error) {
        console.error("Error creating jurusan:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat menambahkan jurusan." });
    }
};

// Memperbarui jurusan berdasarkan ID
exports.updateJurusan = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: "ID tidak valid." });
        }

        const { nama_jurusan, ketua_jurusan } = req.body;

        const updatedJurusan = await prisma.jurusan.update({
            where: { id },
            data: {
                nama_jurusan,
                ketua_jurusan,
            },
        });

        res.status(200).json({ success: true, data: updatedJurusan });
    } catch (error) {
        console.error("Error updating jurusan:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat memperbarui jurusan." });
    }
};

// Menghapus jurusan berdasarkan ID
exports.deleteJurusan = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: "ID tidak valid." });
        }

        const deletedJurusan = await prisma.jurusan.delete({
            where: { id },
        });

        res.status(200).json({ success: true, message: "Jurusan berhasil dihapus", data: deletedJurusan });
    } catch (error) {
        console.error("Error deleting jurusan:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat menghapus jurusan." });
    }
};
