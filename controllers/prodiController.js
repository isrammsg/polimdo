const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mengambil semua data prodi
exports.getAllProdi = async (req, res) => {
  try {
    const prodi = await prisma.prodi.findMany({
      include: { jurusan: true },
    });
    res.json(prodi);
  } catch (error) {
    console.error("Error fetching prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data prodi." });
  }
};

// Mengambil data prodi berdasarkan ID
exports.getProdiById = async (req, res) => {
  try {
    const prodi = await prisma.prodi.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { jurusan: true },
    });

    if (!prodi) {
      return res.status(404).json({ message: "Prodi tidak ditemukan." });
    }

    res.json(prodi);
  } catch (error) {
    console.error("Error fetching prodi by ID:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil data prodi." });
  }
};

// Menambahkan data prodi baru
exports.createProdi = async (req, res) => {
  try {
    const { nama_prodi, ketua_prodi, jurusanId } = req.body;

    const newProdi = await prisma.prodi.create({
      data: {
        nama_prodi,
        ketua_prodi,
        jurusanId: parseInt(jurusanId, 10),
      },
    });

    res.status(201).json(newProdi);
  } catch (error) {
    console.error("Error creating prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menambahkan prodi." });
  }
};

// Memperbarui data prodi berdasarkan ID
exports.updateProdi = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_prodi, ketua_prodi } = req.body;

    const updatedProdi = await prisma.prodi.update({
      where: { id: parseInt(id) },
      data: { nama_prodi, ketua_prodi },
    });

    res.json(updatedProdi);
  } catch (error) {
    console.error("Error updating prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat memperbarui prodi." });
  }
};

// Menghapus data prodi berdasarkan ID
exports.deleteProdi = async (req, res) => {
  try {
    await prisma.prodi.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.json({ message: "Prodi berhasil dihapus." });
  } catch (error) {
    console.error("Error deleting prodi:", error);
    res.status(500).json({ error: "Terjadi kesalahan saat menghapus prodi." });
  }
};
