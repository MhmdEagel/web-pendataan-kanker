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
  console.log("🌱 Seeding patient...");
  await prisma.patient.deleteMany({});

  for (const daerah of kabupaten) {
    const totalPatient = faker.number.int({ min: 50, max: 100 });

    console.log(`📍 ${daerah}: ${totalPatient} pasien`);

    for (let i = 0; i < totalPatient; i++) {
      const terapiDipilih = faker.helpers
        .arrayElements(terapiSet, faker.number.int({ min: 1, max: 3 }))
        .join(", ");

      // 1️⃣ Pemeriksaan Fisik
      const pemeriksaanFisik = await prisma.pemeriksaanFisikDetail.create({
        data: {
          description: faker.lorem.sentence(),
          pemeriksaanImages: {
            create: {
              fileName: "fisik.jpg",
              publicId: faker.string.uuid(),
              url: faker.image.url(),
            },
          },
        },
      });

      // 2️⃣ Epidemiologi
      const epidemiologi = await prisma.epidemiologi.create({
        data: {
          value: faker.helpers.arrayElement(epidemiologiSet),
          tumorDescription: faker.lorem.paragraph(),
          tumorImages: {
            create: [
              {
                fileName: "tumor.jpg",
                publicId: faker.string.uuid(),
                url: faker.image.url(),
              },
            ],
          },
        },
      });

      // 3️⃣ Patient
      const patient = await prisma.patient.create({
        data: {
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
          terapi: terapiDipilih,
          outcome: faker.helpers.arrayElement(outcomeSet),
          fifth_survivor: faker.helpers.arrayElement(fifthSet),
          fifth_survivor_tahun: faker.datatype.boolean()
            ? faker.date.past()
            : null,
          nomor_telepon: faker.phone.number(),
          berat: faker.number.int({ min: 10, max: 80 }),
          tinggi: faker.number.int({ min: 60, max: 180 }),

          epidemiologiId: epidemiologi.id,
          pemeriksaanFisikDetailId: pemeriksaanFisik.id,
        },
      });

      // 4️⃣ Klinis
      await prisma.klinis.create({
        data: {
          patientId: patient.id,
          details: {
            create: [
              {
                value: mapKlinisValue(),
                caption: faker.lorem.sentence(),
                images: {
                  create: {
                    fileName: "klinis.jpg",
                    publicId: faker.string.uuid(),
                    url: faker.image.url(),
                  },
                },
              },
            ],
          },
        },
      });
    }
  }

  console.log("✅ Seeding selesai");
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
