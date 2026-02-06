import z from "zod";

const KlinisValueEnum = z.enum([
  "LABORATORIUM",
  "RADIOLOGI",
  "PATOLOGI_ANATOMI",
  "PEMERIKSAAN_JANTUNG",
]);

const EpidemiologiValueEnum = z.enum([
  "PUCAT",
  "PENDARAHAN",
  "SPLENONEGALI",
  "DEMAM",
  "HEPALOMEGALI",
  "TUMOR",
]);

const imageSchema = z
  .custom<File>((val) => val instanceof File)
  .refine((file) => file.type.startsWith("image/"), {
    message: "File harus berupa gambar",
  });

export const newPatientSchema = z.object({
  nama: z
    .string({
      error: (is) =>
        is.input === undefined ? "Nama tidak boleh kosong" : "Input invalid",
    })
    .min(3, { error: "Nama minimal 3 karakter" }),
  nik: z
    .string({
      error: (is) =>
        is.input === undefined ? "NIK tidak boleh kosong" : "Input invalid",
    })
    .min(8, { error: "NIK minimal 8 karakter" })
    .max(16, { error: "NIK maksimal 16 karakter" })
    .regex(/^\d+$/, { error: "NIK hanya boleh berisi angka" }),
  jenis_kelamin: z.enum(["LAKI_LAKI", "PEREMPUAN"], {
    error: "Pilihan invalid. Silahkan pilih salah satu",
  }),
  tanggal_lahir: z.date({
    error: (is) =>
      is.input === undefined
        ? "Tanggal lahir tidak boleh kosong"
        : "Input invalid",
  }),
  asal_daerah: z.string({
    error: (is) =>
      is.input === undefined
        ? "Asal daerah tidak boleh kosong"
        : "Input invalid",
  }),
  pekerjaan_ayah: z.string({
    error: (is) =>
      is.input === undefined
        ? "Pekerjaan ayah tidak boleh kosong"
        : "Input invalid",
  }),
  pekerjaan_ibu: z.string({
    error: (is) =>
      is.input === undefined
        ? "Pekerjaan ibu tidak boleh kosong"
        : "Input invalid",
  }),
  nomor_telepon: z
    .string({
      error: (is) =>
        is.input === undefined
          ? "Nomor Telepon tidak boleh kosong"
          : "Input invalid",
    })
    .regex(/^08\d{7,11}$/, { error: "Nomor telepon tidak valid" }),
  dokter: z.string({
    error: (is) =>
      is.input === undefined
        ? "Nama dokter tidak boleh kosong"
        : "Input invalid",
  }),
  rumah_sakit: z.string({
    error: (is) =>
      is.input === undefined
        ? "Rumah sakit tidak boleh kosong"
        : "Input invalid",
  }),
  penyelidikan_epidemiologi: z
    .array(EpidemiologiValueEnum)
    .refine((value) => value.some((item) => item), {
      error: "Pilih setidaknya satu gejala.",
    }),
  diagnosa: z.string({
    error: (is) =>
      is.input === undefined ? "Diagnosa tidak boleh kosong" : "Input invalid",
  }),
  terapi: z.array(z.string()).refine((value) => value.some((item) => item), {
    error: "Pilih setidaknya satu terapi.",
  }),
  outcome: z.string({
    error: (is) =>
      is.input === undefined ? "Outcome tidak boleh kosong" : "Input invalid",
  }),
  fifth_survivor: z.string({
    error: (is) =>
      is.input === undefined ? "5th tidak boleh kosong" : "Input invalid",
  }),
  berat: z.coerce.number<string>({
    error: (iss) =>
      iss.input === undefined ? "Berat invalid" : "Berat harus diisi.",
  }),
  tinggi: z.coerce.number<string>({
    error: (iss) =>
      iss.input === undefined ? "Tinggi invalid" : "Tinggi harus diisi.",
  }),
  klinisValues: z.array(KlinisValueEnum).min(1, "Pilih minimal satu klinis"),
  // ===== IMAGE PER KLINIS =====
  klinisImages: z.object({
    LABORATORIUM: z.array(imageSchema).optional(),
    RADIOLOGI: z.array(imageSchema).optional(),
    PATOLOGI_ANATOMI: z.array(imageSchema).optional(),
    PEMERIKSAAN_JANTUNG: z.array(imageSchema).optional(),
  }),

  klinisCaptions: z.object({
    LABORATORIUM: z.string().optional(),
    RADIOLOGI: z.string().optional(),
    PATOLOGI_ANATOMI: z.string().optional(),
    PEMERIKSAAN_JANTUNG: z.string().optional(),
  }),
  pemeriksaanFisikImages: z.array(imageSchema).optional(),
  pemeriksaanFisikCaption: z.string().optional(),
  tumorImages: z.array(imageSchema).optional(),
  tumorDescription: z.string().optional(),
});
