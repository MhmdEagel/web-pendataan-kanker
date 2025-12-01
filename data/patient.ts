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
    const outcomeCategoryMap: Record<string, string> = {
      "drop out": "dalam_pengobatan",
      "relaps/metastase": "dalam_pengobatan",
      "pindah layanan": "dalam_pengobatan",
      survivor: "sembuh",
      meninggal: "meninggal",
    };

    const grouped = await db.patient.groupBy({
      by: ["asal_daerah", "outcome"],
      _count: { id: true },
    });

    const result = grouped.reduce((acc: any[], row) => {
      const outcomeKey = row.outcome.toLowerCase();
      const categoryKey = outcomeCategoryMap[outcomeKey];
      const kab = row.asal_daerah;

      let found = acc.find((x) => x.kabupaten === kab);

      if (!found) {
        found = {
          kabupaten: kab,
          dalam_pengobatan: 0,
          sembuh: 0,
          meninggal: 0,
        };

        acc.push(found);
      }

      found[categoryKey] += row._count.id;

      return acc;
    }, []);

    return result;
  } catch (err) {
    console.error(err);
    return null;
  }
};
