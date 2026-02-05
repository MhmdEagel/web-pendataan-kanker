import z from "zod";

export const filterSchema = z.object({
  NIK: z.string().max(16, { message: "NIK maksimal 16 karakter" }).optional(),
  nama: z.string().optional(),
  jenis_kelamin: z.enum(["LAKI_LAKI", "PEREMPUAN"], {
    error: "Pilihan invalid. Silahkan pilih salah satu",
  }).optional(),
  tanggal_lahir: z.date().optional(),
  asal_daerah: z.string().optional(),
  dokter: z.string().optional(),
  outcome: z.string().optional(),
  klinis: z.string().optional(),
  fifth_survivor: z.string().optional(),
  terapi: z.string().optional(),
  penyelidikan_epidemiologi: z.string().optional(),
});
