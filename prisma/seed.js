const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Insert Jurusan
  const sipil = await prisma.jurusan.create({
    data: {
      nama_jurusan: "Teknik Sipil ",
      ketua_jurusan: "Trio Pendekar Lonan, ST., MT",
    },
  });

  const elektro = await prisma.jurusan.create({
    data: {
      nama_jurusan: "Teknik Elektro",
      ketua_jurusan: "Marson Budiman,SST.,MT",
    },
  });

  // Insert Prodi
  const informatika = await prisma.prodi.create({
    data: {
      nama_prodi: "D4 Teknik Informatika",
      ketua_prodi: "harson Kapoh,ST.,MT",
      jurusan: { connect: { id: elektro.id } },
    },
  });

  const d4listrik = await prisma.prodi.create({
    data: {
      nama_prodi: "D4 Teknik Listrik",
      ketua_prodi: "Donald Noya,SST.,MT",
      jurusan: { connect: { id: elektro.id } },
    },
  });

  const d3listrik = await prisma.prodi.create({
    data: {
      nama_prodi: "D3 Teknik Listrik",
      ketua_prodi: "Anthoinete P.Y. Waroh,ST.MT",
      jurusan: { connect: { id: elektro.id } },
    },
  });

  // Insert Users
  await prisma.user.createMany({
    data: [
      {
        kode: "197405232002121004",
        nama: "Maksy Sendiang,SST.,MT",
        no_telp: "081340096717",
        jurusanId: elektro.id,
        prodiId: informatika.id,
      },
      {
        kode: "197610212002121003",
        nama: "Ottopianus Mellolo, S.Si, MT",
        no_telp: "081340189454",
        jurusanId: elektro.id,
        prodiId: informatika.id,
      },
      {
        kode: "196606041995121002",
        nama: "Ronny Evert Katuuk, SST.,MT",
        no_telp: "082191767475",
        jurusanId: elektro.id,
        prodiId: d3listrik.id, // misalnya belum punya prodi
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Dummy data berhasil ditambahkan!");
  })
  .catch((e) => {
    console.error("Error seeding:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
