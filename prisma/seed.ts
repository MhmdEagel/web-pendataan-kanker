import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const kabupaten = [
  { value: "Bengkalis", label: "Bengkalis" },
  { value: "Indragiri Hilir", label: "Indragiri Hilir" },
  { value: "Indragiri Hulu", label: "Indragiri Hulu" },
  { value: "Kampar", label: "Kampar" },
  { value: "Kepulauan Meranti", label: "Kepulauan Meranti" },
  { value: "Kuantan Singingi", label: "Kuantan Singingi" },
  { value: "Pelalawan", label: "Pelalawan" },
  { value: "Rokan Hilir", label: "Rokan Hilir" },
  { value: "Rokan Hulu", label: "Rokan Hulu" },
  { value: "Siak", label: "Siak" },
  { value: "Dumai", label: "Dumai" },
  { value: "Pekanbaru", label: "Pekanbaru" },
];
const pekerjaanAyah = [
  "Karyawan Swasta",
  "Petani",
  "Nelayan",
  "Wiraswasta",
  "PNS",
  "Buruh Harian",
];

const pekerjaanIbu = [
  "Ibu Rumah Tangga",
  "Guru",
  "Karyawan Swasta",
  "Wiraswasta",
];
const klinisSet = ["Laboratorium", "Radiologi", "Klinis Umum"];
const diagnosaSet = ["Kanker", "Tumor", "Infeksi", "Gastritis", "Asma"];
const terapiSet = ["Kemoterapi", "Operasi", "Radiasi", "Transplantasi"];
const operasiSet = ["Transplantasi", "Operasi Minor", "Operasi Mayor"];
const outcomeSet = [
  "Drop Out",
  "Relaps/Metastase",
  "Meninggal",
  "Pindah Layanan",
  "Survivor",
];
const fifthSet = ["YA", "TIDAK"];
const dokterSet = ["Udin", "Budi", "Siti", "Andi", "Rahmat"];
function randomNIK() {
  // Panjang random 12–16 digit
  const len = faker.number.int({ min: 12, max: 16 });
  return faker.string.numeric(len);
}

function randomTanggalLahir() {
  return faker.date.between({
    from: "1970-01-01",
    to: "2020-12-31",
  });
}

async function seed() {
  console.log("🌱 Memulai seeding patient...");
  await prisma.patient.deleteMany({});
  for (const daerah of kabupaten) {
    const jumlah = faker.number.int({ min: 100, max: 200 });
    console.log(`➡ Mengisi daerah ${daerah.value} dengan ${jumlah} pasien`);
    const patients = Array.from({ length: jumlah }).map(() => ({
      nama: faker.person.fullName(),
      nik: randomNIK(),
      jenis_kelamin: faker.helpers.arrayElement(["LAKI_LAKI", "PEREMPUAN"]),
      tanggal_lahir: randomTanggalLahir(),
      asal_daerah: daerah.value,
      pekerjaan_ayah: faker.helpers.arrayElement(pekerjaanAyah),
      pekerjaan_ibu: faker.helpers.arrayElement(pekerjaanIbu),
      dokter: faker.helpers.arrayElement(dokterSet),
      klinis: faker.helpers.arrayElement(klinisSet),
      diagnosa: faker.helpers.arrayElement(diagnosaSet),
      terapi: faker.helpers.arrayElement(terapiSet),
      operasi: faker.helpers.arrayElement(operasiSet),
      outcome: faker.helpers.arrayElement(outcomeSet),
      fifth_survivor: faker.helpers.arrayElement(fifthSet),
      rumah_sakit: `RS ${faker.lorem.word()}`
    }));

    await prisma.patient.createMany({
      data: patients,
      skipDuplicates: true,
    });
  }

  console.log("✅ Selesai seeding pasien!");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
