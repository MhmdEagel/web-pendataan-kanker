import { db } from "@/lib/db";
import { getKabupatenColorAndId } from "@/lib/utils";

export const getPatientData = async () => {
  try {
    const res = await db.patient.findMany({});
    return res;
  } catch {
    return null;
  }
};

export const getPatientDetailData = async (patientId: string) => {
  try {
    const res = await db.patient.findUnique({
      where: {
        id: patientId,
      },
    });
    return res;
  } catch {
    return null;
  }
};

export const getPatientCount = async () => {
  try {
    const res = await db.patient.groupBy({
      by: ["asal_daerah"],
      _count: { id: true },
    });
    return res.map((r) => {
      const colorData = getKabupatenColorAndId(r.asal_daerah);
      return {
        kabupaten: colorData?.id,
        patients: r._count.id,
        fill: colorData?.fill,
      };
    });
  } catch {
    return null;
  }
};

export const getAllPatientCount = async () => {
  try {
    const res = await db.patient.count()
    return res
  } catch {
    return null
  }
}
