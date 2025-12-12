import z from "zod";

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
  jenis_kelamin: z.enum(["PRIA", "WANITA"], {
    error: "Pilihan invalid. Silahkan pilih salah satu",
  }),
  tanggal_lahir: z.date({
    error: (is) =>
      is.input === undefined ? "Tanggal lahir tidak boleh kosong" : "Input invalid",
  }),
  asal_daerah: z.string({
    error: (is) =>
      is.input === undefined ? "Asal daerah tidak boleh kosong" : "Input invalid",
  }),
  pekerjaan_ayah: z.string({
    error: (is) =>
      is.input === undefined ? "Pekerjaan ayah tidak boleh kosong" : "Input invalid",
  }),
  pekerjaan_ibu: z.string({
    error: (is) =>
      is.input === undefined ? "Pekerjaan ibu tidak boleh kosong" : "Input invalid",
  }),
  dokter: z.string({
    error: (is) =>
      is.input === undefined ? "Nama dokter tidak boleh kosong" : "Input invalid",
  }),
  rumah_sakit: z.string({
    error: (is) =>
      is.input === undefined ? "Rumah sakit tidak boleh kosong" : "Input invalid",
  }),
  klinis: z.string({
    error: (is) =>
      is.input === undefined ? "Klinis tidak boleh kosong" : "Input invalid",
  }),
  diagnosa: z.string({
    error: (is) =>
      is.input === undefined ? "Diagnosa tidak boleh kosong" : "Input invalid",
  }),
  terapi: z.string({
    error: (is) =>
      is.input === undefined ? "Terapi tidak boleh kosong" : "Input invalid",
  }),
  outcome: z.string({
    error: (is) =>
      is.input === undefined ? "Outcome tidak boleh kosong" : "Input invalid",
  }),
  fifth_survivor: z.string({
    error: (is) =>
      is.input === undefined ? "5th tidak boleh kosong" : "Input invalid",
  })
});
