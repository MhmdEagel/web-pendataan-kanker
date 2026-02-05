import { getPatientImagesForCleanup } from "@/data/patient";
import { db } from "@/lib/db";
import { deleteMultipleImages } from "@/lib/upload";

export const deleteData = async (formData: FormData) => {
  const patientId = formData.get("id") as string;

  const data = await getPatientImagesForCleanup(patientId);
  if (!data) {
    return { status: "error", message: "pasien tidak ditemukan" };
  }

  const klinisImagesPublicId = data.klinisImages.map((item) => item.publicId);
  const epidemiologiImagesPublicId = data.epidemiologiImages.map(
    (item) => item.publicId,
  );

  try {
    await deleteMultipleImages(klinisImagesPublicId);
    await deleteMultipleImages(epidemiologiImagesPublicId);
  } catch (e) {
    return { status: "error", message: (e as Error).message };
  }

  try {
    await db.patient.delete({
      where: { id: patientId },
    });
  } catch {
    return { status: "error", message: "terjadi kesalahan" };
  }
};
