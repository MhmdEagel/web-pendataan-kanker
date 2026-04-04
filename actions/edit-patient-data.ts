"use server";
import { db } from "@/lib/db";
import { deleteMultipleImages, uploadMultipleImages } from "@/lib/upload";
import { editPatientSchema } from "@/schemas/edit_patient";
import { CloudinaryUploadResult } from "@/types/Cloudinary";
import { revalidatePath } from "next/cache";
import z from "zod";

async function deleteImages(
  db: any,
  table: any,
  whereField: string,
  ids: string[] | undefined,
) {
  if (!ids?.length) return;

  const imagesToDelete = await (table as any).findMany({
    where: { [whereField]: { in: ids } },
    select: { id: true, publicId: true },
  });

  const dbIds = imagesToDelete.map((img: any) => img.id);
  const publicIds = imagesToDelete.map((img: any) => img.publicId);

  await (table as any).deleteMany({
    where: { id: { in: dbIds } },
  });

  await deleteMultipleImages(publicIds);
}

export async function editPatientData(
  data: z.infer<typeof editPatientSchema>,
  id: string,
) {
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

  await deleteImages(db, db.klinisImage, "id", data.deletedKlinisImageIds);
  await deleteImages(db, db.pemeriksaanFisikImage, "id", data.deletedPemeriksaanFisikImageIds);
  await deleteImages(db, db.tumorImages, "id", data.deletedTumorImageIds);

  let uploadLaboratoriumResult: CloudinaryUploadResult[] = [];
  let uploadRadiologiResult: CloudinaryUploadResult[] = [];
  let uploadPatologiAnatomiResult: CloudinaryUploadResult[] = [];
  let uploadPemeriksaanJantungResult: CloudinaryUploadResult[] = [];

  if (klinisImages.LABORATORIUM?.length) {
    uploadLaboratoriumResult = await uploadMultipleImages(klinisImages.LABORATORIUM);
  }
  if (klinisImages.RADIOLOGI?.length) {
    uploadRadiologiResult = await uploadMultipleImages(klinisImages.RADIOLOGI);
  }
  if (klinisImages.PATOLOGI_ANATOMI?.length) {
    uploadPatologiAnatomiResult = await uploadMultipleImages(klinisImages.PATOLOGI_ANATOMI);
  }
  if (klinisImages.PEMERIKSAAN_JANTUNG?.length) {
    uploadPemeriksaanJantungResult = await uploadMultipleImages(klinisImages.PEMERIKSAAN_JANTUNG);
  }

  const klinisUploadResult = {
    LABORATORIUM: uploadLaboratoriumResult,
    RADIOLOGI: uploadRadiologiResult,
    PATOLOGI_ANATOMI: uploadPatologiAnatomiResult,
    PEMERIKSAAN_JANTUNG: uploadPemeriksaanJantungResult,
  };

  let uploadTumorResult: CloudinaryUploadResult[] = [];
  if (tumorImages?.length) {
    uploadTumorResult = await uploadMultipleImages(tumorImages);
  }

  let uploadPemeriksaanFisikResult: CloudinaryUploadResult[] = [];
  if (pemeriksaanFisikImages?.length) {
    uploadPemeriksaanFisikResult = await uploadMultipleImages(pemeriksaanFisikImages);
  }

  try {
    const existingPatient = await db.patient.findUnique({
      where: { id },
      include: {
        klinis: {
          include: {
            details: {
              include: { images: true },
            },
          },
        },
        pemeriksaanFisikDetail: {
          include: { pemeriksaanImages: true },
        },
        epidemiologi: {
          include: { tumorImages: true },
        },
      },
    });

    const existingKlinis = existingPatient?.klinis[0];
    const existingPemeriksaanFisik = existingPatient?.pemeriksaanFisikDetail;
    const existingEpidemiologi = existingPatient?.epidemiologi;

    if (existingKlinis) {
      const detailsToDelete = existingKlinis.details
        .filter((d) => !klinisValues.includes(d.value))
        .map((d) => d.id);

      if (detailsToDelete.length > 0) {
        await db.klinisDetail.deleteMany({ where: { id: { in: detailsToDelete } } });
      }

      for (const value of klinisValues) {
        const existingDetail = existingKlinis.details.find((d) => d.value === value);
        const newImages = klinisUploadResult?.[value] || [];

        if (existingDetail) {
          await db.klinisDetail.update({
            where: { id: existingDetail.id },
            data: {
              caption: klinisCaptions[value] || "",
              ...(newImages.length > 0 && {
                images: {
                  create: newImages.map((img) => ({
                    fileName: img.filename,
                    url: img.secure_url,
                    publicId: img.public_id,
                  })),
                },
              }),
            },
          });
        } else {
          await db.klinisDetail.create({
            data: {
              klinisId: existingKlinis.id,
              value,
              caption: klinisCaptions[value] || "",
              images: {
                create: newImages.map((img) => ({
                  fileName: img.filename,
                  url: img.secure_url,
                  publicId: img.public_id,
                })),
              },
            },
          });
        }
      }
    } else if (klinisValues.length > 0) {
      await db.klinis.create({
        data: {
          patientId: id,
          details: {
            create: klinisValues.map((value) => ({
              value,
              caption: klinisCaptions[value] || "",
              images: {
                create: klinisUploadResult?.[value]?.map((img) => ({
                  fileName: img.filename,
                  url: img.secure_url,
                  publicId: img.public_id,
                })) ?? [],
              },
            })),
          },
        },
      });
    }

    if (existingPemeriksaanFisik) {
      await db.pemeriksaanFisikDetail.update({
        where: { id: existingPemeriksaanFisik.id },
        data: {
          description: patient.pemeriksaanFisikCaption || "",
          ...(uploadPemeriksaanFisikResult.length > 0 && {
            pemeriksaanImages: {
              create: uploadPemeriksaanFisikResult.map((img) => ({
                fileName: img.filename,
                url: img.secure_url,
                publicId: img.public_id,
              })),
            },
          }),
        },
      });
    } else if (uploadPemeriksaanFisikResult.length > 0 || patient.pemeriksaanFisikCaption) {
      await db.pemeriksaanFisikDetail.create({
        data: {
          patient: { connect: { id } },
          description: patient.pemeriksaanFisikCaption || "",
          pemeriksaanImages: {
            create: uploadPemeriksaanFisikResult.map((img) => ({
              fileName: img.filename,
              url: img.secure_url,
              publicId: img.public_id,
            })),
          },
        },
      });
    }

    if (existingEpidemiologi) {
      await db.epidemiologi.update({
        where: { id: existingEpidemiologi.id },
        data: {
          value: penyelidikan_epidemiologi.join(","),
          tumorDescription: tumorDescription || "",
          ...(uploadTumorResult.length > 0 && {
            tumorImages: {
              create: uploadTumorResult.map((img) => ({
                fileName: img.filename,
                url: img.secure_url,
                publicId: img.public_id,
              })),
            },
          }),
        },
      });
    } else {
      await db.epidemiologi.create({
        data: {
          patient: { connect: { id } },
          value: penyelidikan_epidemiologi.join(","),
          tumorDescription: tumorDescription || "",
          tumorImages: {
            create: uploadTumorResult.map((img) => ({
              fileName: img.filename,
              url: img.secure_url,
              publicId: img.public_id,
            })),
          },
        },
      });
    }

    await db.patient.update({
      where: { id },
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
        terapi: patient.terapi.join(", "),
        outcome: patient.outcome,
        fifth_survivor: patient.fifth_survivor,
        fifth_survivor_tahun: patient.fifth_survivor_tahun,
        berat: patient.berat,
        tinggi: patient.tinggi,
        nomor_telepon: patient.nomor_telepon,
        no_register: patient.no_register,
        no_rm: patient.no_rm,
      },
    });

    revalidatePath("/dashboard");
    return { success: "Data berhasil diubah", error: null };
  } catch (e) {
    console.error(e);
    return { success: null, error: (e as Error).message };
  }
}
