import { PrismaClient, Gender, KlinisValue } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

/* ================== SET ================== */
const kabupaten = [
  "Bengkalis",
  "Indragiri Hilir",
  "Indragiri Hulu",
  "Kampar",
  "Kepulauan Meranti",
  "Kuantan Singingi",
  "Pelalawan",
  "Rokan Hilir",
  "Rokan Hulu",
  "Siak",
  "Dumai",
  "Pekanbaru",
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

const diagnosaSet = ["Kanker", "Tumor", "Infeksi", "Gastritis", "Asma"];

const epidemiologiSet = [
  "PUCAT",
  "PENDARAHAN",
  "SPLENOMEGALI",
  "DEMAM",
  "HEPATOMEGALI",
  "TUMOR",
];

const terapiSet = ["Operasi", "Kemotrapi", "Radiasi", "Transplantasi"];

const outcomeSet = [
  "Drop Out",
  "Relaps/Metastase",
  "Meninggal",
  "Pindah Layanan",
  "Survivor",
];

const fifthSet = ["YA", "TIDAK"];
const dokterSet = ["Udin", "Budi", "Siti", "Andi", "Rahmat"];

/* ================== HELPER ================== */
function randomNIK() {
  return faker.string.numeric(faker.number.int({ min: 12, max: 16 }));
}

function mapKlinisValue(): KlinisValue {
  return faker.helpers.arrayElement([
    KlinisValue.LABORATORIUM,
    KlinisValue.RADIOLOGI,
    KlinisValue.PATOLOGI_ANATOMI,
    KlinisValue.PEMERIKSAAN_JANTUNG,
  ]);
}

/* ================== SEED ================== */
async function seed() {
  console.log("🌱 Seeding (batch mode)...");

  // ❌ clear
  await prisma.klinisImage.deleteMany({});
  await prisma.klinisDetail.deleteMany({});
  await prisma.klinis.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.epidemiologi.deleteMany({});
  await prisma.tumorImages.deleteMany({});
  await prisma.pemeriksaanFisikImage.deleteMany({});
  await prisma.pemeriksaanFisikDetail.deleteMany({});

  // ================== ARRAY ==================
  const pemeriksaanData: any[] = [];
  const pemeriksaanImageData: any[] = [];

  const epidemiologiData: any[] = [];
  const tumorImageData: any[] = [];

  const patientData: any[] = [];

  const klinisData: any[] = [];
  const detailData: any[] = [];
  const klinisImageData: any[] = [];

  // ================== GENERATE ==================
  for (const daerah of kabupaten) {
    const total = faker.number.int({ min: 50, max: 100 });

    console.log(`📍 ${daerah}: ${total}`);

    for (let i = 0; i < total; i++) {
      const pemeriksaanId = faker.string.uuid();
      const epidemiologiId = faker.string.uuid();
      const patientId = faker.string.uuid();
      const klinisId = faker.string.uuid();
      const detailId = faker.string.uuid();

      // pemeriksaan
      pemeriksaanData.push({
        id: pemeriksaanId,
        description: faker.lorem.sentence(),
      });

      pemeriksaanImageData.push({
        pemeriksaanFisikDetailId: pemeriksaanId,
        fileName: "fisik.jpg",
        publicId: faker.string.uuid(),
        url: faker.image.url(),
      });

      // epidemiologi
      epidemiologiData.push({
        id: epidemiologiId,
        value: faker.helpers.arrayElement(epidemiologiSet),
        tumorDescription: faker.lorem.paragraph(),
      });

      tumorImageData.push({
        epidemiologiId,
        fileName: "tumor.jpg",
        publicId: faker.string.uuid(),
        url: faker.image.url(),
      });

      // patient
      patientData.push({
        id: patientId,
        nama: faker.person.fullName(),
        nik: randomNIK(),
        jenis_kelamin: faker.helpers.arrayElement([
          Gender.LAKI_LAKI,
          Gender.PEREMPUAN,
        ]),
        tanggal_lahir: faker.date.past({ years: 20 }),
        no_register: faker.string.alphanumeric(10),
        no_rm: faker.string.alphanumeric(8),
        asal_daerah: daerah,
        pekerjaan_ayah: faker.helpers.arrayElement(pekerjaanAyah),
        pekerjaan_ibu: faker.helpers.arrayElement(pekerjaanIbu),
        dokter: faker.helpers.arrayElement(dokterSet),
        rumah_sakit: `RS ${faker.company.name()}`,
        diagnosa: faker.helpers.arrayElement(diagnosaSet),
        terapi: faker.helpers
          .arrayElements(terapiSet, faker.number.int({ min: 1, max: 3 }))
          .join(", "),
        outcome: faker.helpers.arrayElement(outcomeSet),
        fifth_survivor: faker.helpers.arrayElement(fifthSet),
        fifth_survivor_tahun: faker.datatype.boolean()
          ? faker.date.past()
          : null,
        nomor_telepon: faker.phone.number(),
        berat: faker.number.int({ min: 10, max: 80 }),
        tinggi: faker.number.int({ min: 60, max: 180 }),
        epidemiologiId,
        pemeriksaanFisikDetailId: pemeriksaanId,
      });

      // klinis
      klinisData.push({
        id: klinisId,
        patientId,
      });

      detailData.push({
        id: detailId,
        klinisId,
        value: mapKlinisValue(),
        caption: faker.lorem.sentence(),
      });

      klinisImageData.push({
        detailId,
        fileName: "klinis.jpg",
        publicId: faker.string.uuid(),
        url: faker.image.url(),
      });
    }
  }

  // ================== INSERT ==================
  await prisma.pemeriksaanFisikDetail.createMany({ data: pemeriksaanData });
  await prisma.pemeriksaanFisikImage.createMany({ data: pemeriksaanImageData });

  await prisma.epidemiologi.createMany({ data: epidemiologiData });
  await prisma.tumorImages.createMany({ data: tumorImageData });

  await prisma.patient.createMany({ data: patientData });

  await prisma.klinis.createMany({ data: klinisData });
  await prisma.klinisDetail.createMany({ data: detailData });
  await prisma.klinisImage.createMany({ data: klinisImageData });

  console.log("✅ SEEDING SUPER CEPAT SELESAI");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());