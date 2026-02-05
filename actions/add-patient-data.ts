"use server";
import { db } from "@/lib/db";
import { uploadMultipleImages } from "@/lib/upload";
import { newPatientSchema } from "@/schemas/new_patient";
import { CloudinaryUploadResult } from "@/types/Cloudinary";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function addPatientData(data: z.infer<typeof newPatientSchema>) {
  const {
    klinisValues,
    klinisImages,
    klinisCaptions,
    penyelidikan_epidemiologi,
    pemeriksaanFisikImages,
    tumorImages,
    tumorDescription,
    ...patient
  } = data;

  // ###### GAMBAR KLINIS #######
  let uploadLaboratoriumResult: CloudinaryUploadResult[] = [];
  let uploadRadiologiResult: CloudinaryUploadResult[] = [];
  let uploadPatologiAnatomiResult: CloudinaryUploadResult[] = [];
  let uploadPemeriksaanJantungResult: CloudinaryUploadResult[] = [];

  if (klinisImages.LABORATORIUM) {
    uploadLaboratoriumResult = await uploadMultipleImages(
      klinisImages.LABORATORIUM,
    );
  }
  if (klinisImages.RADIOLOGI) {
    uploadRadiologiResult = await uploadMultipleImages(klinisImages.RADIOLOGI);
  }
  if (klinisImages.PATOLOGI_ANATOMI) {
    uploadPatologiAnatomiResult = await uploadMultipleImages(
      klinisImages.PATOLOGI_ANATOMI,
    );
  }
  if (klinisImages.PEMERIKSAAN_JANTUNG) {
    uploadPemeriksaanJantungResult = await uploadMultipleImages(
      klinisImages.PEMERIKSAAN_JANTUNG,
    );
  }

  const klinisUploadResult = {
    LABORATORIUM: uploadLaboratoriumResult,
    RADIOLOGI: uploadRadiologiResult,
    PATOLOGI_ANATOMI: uploadPatologiAnatomiResult,
    PEMERIKSAAN_JANTUNG: uploadPemeriksaanJantungResult,
  };

  // ###### GAMBAR EPIDEMIOLOGI #######
  let uploadTumorResult: CloudinaryUploadResult[] = [];

  if (tumorImages) {
    uploadTumorResult = await uploadMultipleImages(tumorImages);
  }

  // ##### GAMBAR PEMERIKSAAN FISIK ########
  let uploadPemeriksaanFisikResult: CloudinaryUploadResult[] = [];
  if (pemeriksaanFisikImages) {
    uploadPemeriksaanFisikResult = await uploadMultipleImages(
      pemeriksaanFisikImages,
    );
  }

  try {
    await db.patient.create({
      data: {
        nama: patient.nama,
        nik: patient.nik,
        jenis_kelamin: patient.jenis_kelamin,
        tanggal_lahir: patient.tanggal_lahir,
        asal_daerah: patient.asal_daerah,
        pekerjaan_ayah: patient.pekerjaan_ayah,
        pekerjaan_ibu: patient.pekerjaan_ibu,
        dokter: patient.dokter,
        rumah_sakit: patient.rumah_sakit,
        diagnosa: patient.diagnosa,
        terapi: patient.terapi.join(", "), // karena di prisma String
        outcome: patient.outcome,
        fifth_survivor: patient.fifth_survivor,
        berat: patient.berat,
        tinggi: patient.tinggi,
        nomor_telepon: patient.nomor_telepon,

        // ======================
        // PEMERIKSAAN FISIK
        // ======================
        pemeriksaanFisikDetail: {
          create: {
            description: patient.pemeriksaanFisikCaption,
            pemeriksaanImages: {
              create:
                uploadPemeriksaanFisikResult?.map((img) => ({
                  fileName: img.filename,
                  url: img.secure_url,
                  publicId: img.public_id,
                })) ?? [],
            },
          },
        },

        // ======================
        // KLINIS
        // ======================
        klinis: {
          create: {
            details: {
              create: klinisValues.map((value) => ({
                value,
                caption: klinisCaptions[value],
                images: {
                  create:
                    klinisUploadResult?.[value]?.map((img) => ({
                      fileName: img.filename,
                      url: img.secure_url,
                      publicId: img.public_id,
                    })) ?? [],
                },
              })),
            },
          },
        },

        // ======================
        // EPIDEMIOLOGI
        // ======================
        epidemiologi: {
          create: {
            value: penyelidikan_epidemiologi.join(","),
            tumorDescription,
            tumorImages: {
              create:
                uploadTumorResult.map((img) => ({
                  fileName: img.filename,
                  url: img.secure_url,
                  publicId: img.public_id,
                })) ?? [],
            },
          },
        },
      },
    });

    revalidatePath("/dashboard");
    return { success: "Data berhasil ditambah", error: null };
  } catch (e) {
    return { success: null, error: (e as Error).message };
  }
}
