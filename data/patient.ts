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

export const getPatientCountWithFill = async () => {
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
export const getPatientCountByKabupaten = async () => {
  try {
    const res = await db.patient.groupBy({
      by: ["asal_daerah"],
      _count: { id: true },
    });
    return res.map((r) => {
      return {
        kabupaten: r.asal_daerah,
        patients: r._count.id,
      };
    });
  } catch {
    return null;
  }
};

export const getAllPatientCount = async () => {
  try {
    const res = await db.patient.count();
    return res;
  } catch {
    return null;
  }
};

export const getAllPatientCountByStatus = async () => {
  try {
    const grouped = await db.patient.groupBy({
      by: ["asal_daerah", "outcome"],
      _count: { id: true },
    });
    const result = grouped.reduce((acc: any, row: any) => {
      const daerah: string = row.asal_daerah;
      const outcome: string = row.outcome;
      const parsedOutome = outcome.toLowerCase().split(/[ /]+/).join("_");
      if (!acc[daerah]) {
        acc[daerah] = { kabupaten: daerah };
      }
      // kalo belum ada key outcome → set 0 dulu
      if (!acc[daerah][parsedOutome]) {
        acc[daerah][parsedOutome] = 0;
      }
      acc[daerah][parsedOutome] += row._count.id;

      return acc;
    }, {});

    return Object.values(result);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllPatientCountOutcomeByKabupaten = async (
  kabupaten: string
) => {
  try {
    const r = await db.patient.groupBy({
      by: ["outcome"],
      _count: { id: true },
      where: {
        asal_daerah: kabupaten,
      },
    });
    return r.map((r) => ({
      outcome: r.outcome.toLowerCase().split(/[ /]+/).join("_"),
      patients: r._count.id,
    }));
  } catch (err) {
    console.error(err);
    return null;
  }
};
