const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mengambil semua users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { jurusan: true, prodi: true },
        });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat mengambil data users." });
    }
};

// Mengambil user berdasarkan ID
exports.getUserById = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: "ID tidak valid." });
        }

        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
            return res.status(404).json({ success: false, error: "User tidak ditemukan." });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat mengambil data user." });
    }
};

// Menambahkan user baru
exports.createUser = async (req, res) => {
    try {
        const { kode, nama, no_telp, jurusanId, prodiId } = req.body;

        // Validasi input
        if (!kode || !nama || !no_telp || !jurusanId || !prodiId) {
            return res.status(400).json({ success: false, error: "Semua field harus diisi." });
        }

        const jurusanIdInt = parseInt(jurusanId, 10);
        const prodiIdInt = parseInt(prodiId, 10);

        if (isNaN(jurusanIdInt) || isNaN(prodiIdInt)) {
            return res.status(400).json({ success: false, error: "jurusanId dan prodiId harus berupa angka." });
        }

        const newUser = await prisma.user.create({
            data: {
                kode,
                nama,
                no_telp,
                jurusanId: jurusanIdInt,
                prodiId: prodiIdInt,
            },
        });

        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat menambahkan user." });
    }
};

// Memperbarui user berdasarkan ID
exports.updateUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: "ID tidak valid." });
        }

        const { nama, no_telp } = req.body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { nama, no_telp },
        });

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat memperbarui user." });
    }
};

// Menghapus user berdasarkan ID
exports.deleteUser = async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ success: false, error: "ID tidak valid." });
        }

        const deletedUser = await prisma.user.delete({ where: { id } });

        res.status(200).json({ success: true, message: "User berhasil dihapus", data: deletedUser });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, error: "Terjadi kesalahan saat menghapus user." });
    }
};
