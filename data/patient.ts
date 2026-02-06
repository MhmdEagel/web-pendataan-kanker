import { terapi } from "@/components/constants/input.constant";
import { db } from "@/lib/db";
import { getKabupatenColorAndId } from "@/lib/utils";
import { filterSchema } from "@/schemas/filter-data";
import { Prisma } from "@prisma/client";
export type FilterInput = {
  NIK?: string;
  nama?: string;
  jenis_kelamin?: string;
  tanggal_lahir?: Date;
  asal_daerah?: string;
  dokter?: string;
  outcome?: string;
  klinis?: string;
  fifth_survivor?: string;
  terapi?: string;
  penyelidikan_epidemiologi?: string;
};

export const parseSearchParams = (params: Record<string, any>) => {
  return filterSchema.parse({
    NIK: params.NIK,
    nama: params.nama,
    jenis_kelamin: params.jenis_kelamin,
    asal_daerah: params.asal_daerah,
    dokter: params.dokter,
    outcome: params.outcome,
    klinis: params.klinis,
    fifth_survivor: params.fifth_survivor,
    terapi: params.terapi,
    penyelidikan_epidemiologi: params.penyelidikan_epidemiologi,

    // date parsing
    tanggal_lahir: params.tanggal_lahir
      ? new Date(params.tanggal_lahir)
      : undefined,
  });
};

export const buildPatientFilter = (
  filter: FilterInput,
): Prisma.PatientWhereInput => {
  const where: Prisma.PatientWhereInput = {};

  if (filter.NIK) {
    where.nik = {
      contains: filter.NIK,
    };
  }

  if (filter.nama) {
    where.nama = {
      contains: filter.nama,
    };
  }

  if (filter.jenis_kelamin) {
    where.jenis_kelamin = filter.jenis_kelamin as any;
  }

  if (filter.tanggal_lahir) {
    where.tanggal_lahir = filter.tanggal_lahir;
  }

  if (filter.asal_daerah) {
    where.asal_daerah = {
      contains: filter.asal_daerah,
    };
  }

  if (filter.dokter) {
    where.dokter = {
      contains: filter.dokter,
    };
  }

  if (filter.outcome) {
    where.outcome = {
      contains: filter.outcome,
    };
  }

  if (filter.terapi) {
    where.terapi = {
      contains: filter.terapi,
    };
  }

  if (filter.fifth_survivor) {
    where.fifth_survivor = {
      contains: filter.fifth_survivor,
    };
  }

  // 🔗 relasi Klinis
  if (filter.klinis) {
    where.klinis = {
      some: {
        details: {
          some: {
            value: filter.klinis as any,
          },
        },
      },
    };
  }

  // 🔗 relasi Epidemiologi
  if (filter.penyelidikan_epidemiologi) {
    where.epidemiologi = {
      value: {
        contains: filter.penyelidikan_epidemiologi,
      },
    };
  }

  return where;
};

export const getPatientData = async (searchParams?: Record<string, any>) => {
  try {
    if (searchParams) {
      const filter = parseSearchParams(searchParams);
      const res = await db.patient.findMany({
        where: buildPatientFilter(filter),
        include: {
          klinis: {
            include: {
              details: true,
            },
          },
          epidemiologi: true,
          pemeriksaanFisikDetail: true,
        },
      });
      return res;
    }
    const res = await db.patient.findMany({});
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const getPatientDetailData = async (patientId: string) => {
  try {
    const res = await db.patient.findUnique({
      where: {
        id: patientId,
      },
      include: {
        klinis: {
          include: {
            details: {
              include: {
                images: true,
              },
            },
          },
        },
        epidemiologi: {
          include: {
            tumorImages: true,
          },
        },
        pemeriksaanFisikDetail: {
          include: {
            pemeriksaanImages: true,
          },
        },
      },
    });
    return normalizePatientDetail(res);
  } catch (error) {
    console.error(error);
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
export const getAllPatientOutcomeCountByGender = async (
  gender: "LAKI_LAKI" | "PEREMPUAN",
) => {
  try {
    const grouped = await db.patient.groupBy({
      by: ["asal_daerah", "outcome"],
      where: {
        jenis_kelamin: gender,
      },
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
export const getAllPatientFifthSurvivorCountByGender = async (
  gender: "LAKI_LAKI" | "PEREMPUAN",
) => {
  try {
    const grouped = await db.patient.groupBy({
      by: ["asal_daerah", "fifth_survivor"],
      where: {
        jenis_kelamin: gender,
      },
      _count: { id: true },
    });
    const result = grouped.reduce((acc: any, row: any) => {
      const daerah: string = row.asal_daerah;
      const fifthSurvivor: string = row.fifth_survivor;
      if (!acc[daerah]) {
        acc[daerah] = { kabupaten: daerah };
      }
      if (!acc[daerah][fifthSurvivor]) {
        acc[daerah][fifthSurvivor] = 0;
      }
      acc[daerah][fifthSurvivor] += row._count.id;

      return acc;
    }, {});

    return Object.values(result);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllPatientCountByKlinis = async (
  gender: "LAKI_LAKI" | "PEREMPUAN",
) => {
  try {
    const data = await db.klinisDetail.findMany({
      where: {
        klinis: {
          patient: {
            jenis_kelamin: gender,
          },
        },
      },
      select: {
        value: true,
        klinis: {
          select: {
            patient: {
              select: {
                asal_daerah: true,
              },
            },
          },
        },
      },
    });

    const result = data.reduce((acc: any, item) => {
      const daerah = item.klinis.patient.asal_daerah;
      const klinis = item.value.toLowerCase().split(/[ /]+/).join("_");

      if (!acc[daerah]) {
        acc[daerah] = { kabupaten: daerah };
      }

      acc[daerah][klinis] = (acc[daerah][klinis] || 0) + 1;

      return acc;
    }, {});

    return Object.values(result);
  } catch (err) {
    console.error(err);
    return null;
  }
};
export const getPatientCountByTerapiPerKabupaten = async (
  gender?: "LAKI_LAKI" | "PEREMPUAN",
) => {
  try {
    const patients = await db.patient.findMany({
      select: {
        asal_daerah: true,
        terapi: true,
      },
      where: gender
        ? {
            jenis_kelamin: gender,
          }
        : undefined,
    });

    const resultMap: Record<
      string,
      {
        kabupaten: string;
        operasi: number;
        radiasi: number;
        kemotrapi: number;
        transplantasi: number;
      }
    > = {};

    patients.forEach((p) => {
      const kabupaten = p.asal_daerah;

      if (!resultMap[kabupaten]) {
        resultMap[kabupaten] = {
          kabupaten,
          operasi: 0,
          radiasi: 0,
          kemotrapi: 0,
          transplantasi: 0,
        };
      }

      if (!p.terapi) return;

      const terapies = p.terapi.split(",").map((t) => t.trim().toLowerCase());

      terapies.forEach((t) => {
        if (t.includes("operasi")) resultMap[kabupaten].operasi++;
        else if (t.includes("radiasi")) resultMap[kabupaten].radiasi++;
        else if (t.includes("kemotrapi")) resultMap[kabupaten].kemotrapi++;
        else if (t.includes("transplantasi"))
          resultMap[kabupaten].transplantasi++;
      });
    });

    return Object.values(resultMap);
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPatientImagesForCleanup = async (patientId: string) => {
  const patient = await db.patient.findUnique({
    where: { id: patientId },
    select: {
      klinis: {
        select: {
          details: {
            select: {
              images: {
                select: {
                  id: true,
                  publicId: true,
                  url: true,
                },
              },
            },
          },
        },
      },
      pemeriksaanFisikDetail: {
        select: {
          pemeriksaanImages: {
            select: {
              id: true,
              publicId: true,
              url: true,
            },
          },
        },
      },
      epidemiologi: {
        select: {
          tumorImages: {
            select: {
              id: true,
              publicId: true,
              url: true,
            },
          },
        },
      },
    },
  });

  if (!patient) return null;

  const klinisImages = patient.klinis.flatMap((k) =>
    k.details.flatMap((d) => d.images),
  );

  const pemeriksaanImages =
    patient.pemeriksaanFisikDetail?.pemeriksaanImages ?? [];

  const tumorImages = patient.epidemiologi?.tumorImages ?? [];

  return {
    klinisImages,
    pemeriksaanImages,
    tumorImages,
    allImages: [...klinisImages, ...pemeriksaanImages, ...tumorImages],
  };
};

export const getAllPatientCountEpidemiologiByGender = async (
  gender: "LAKI_LAKI" | "PEREMPUAN",
) => {
  try {
    const data = await db.epidemiologi.findMany({
      where: {
        patient: {
          jenis_kelamin: gender,
        },
      },
      select: {
        value: true,
        tumorDescription: true,
        patient: {
          select: {
            asal_daerah: true,
          },
        },
      },
    });

    const result = data.reduce((acc: any, item) => {
      const daerah = item.patient?.asal_daerah;
      if (!daerah) return acc;

      if (!acc[daerah]) {
        acc[daerah] = {
          kabupaten: daerah,
          pucat: 0,
          pendarahan: 0,
          splenomegali: 0,
          demam: 0,
          hepatomegali: 0,
          tumor: 0,
        };
      }

      // value bisa berisi multiple gejala
      if (item.value) {
        const values = item.value
          .toLowerCase()
          .split(/[ /,]+/)
          .map((v) => v.trim());

        values.forEach((v) => {
          if (v in acc[daerah]) {
            acc[daerah][v]++;
          }
        });
      }

      // tumor dihitung dari tumorDescription
      if (item.tumorDescription && item.tumorDescription.trim() !== "") {
        acc[daerah].tumor++;
      }

      return acc;
    }, {});

    return Object.values(result) as {
      kabupaten: string;
      pucat: number;
      pendarahan: number;
      splenomegali: number;
      demam: number;
      hepatomegali: number;
      tumor: number;
    }[];
  } catch (err) {
    console.error(err);
    return null;
  }
};

// helper

const normalizePatientDetail = (patient: any) => {
  if (!patient) return null;
  // ======================
  // KLINIS (TETAP)
  // ======================
  const klinisData: Record<string, { caption: string | null; images: any[] }> =
    {
      LABORATORIUM: { caption: null, images: [] },
      RADIOLOGI: { caption: null, images: [] },
      PATOLOGI_ANATOMI: { caption: null, images: [] },
      PEMERIKSAAN_JANTUNG: { caption: null, images: [] },
    };

  const klinisValues = new Set<string>();

  patient.klinis?.forEach((klinis: any) => {
    klinis.details?.forEach((detail: any) => {
      klinisValues.add(detail.value);
      klinisData[detail.value] = {
        caption: detail.caption ?? null,
        images: detail.images ?? [],
      };
    });
  });

  // ======================
  // EPIDEMIOLOGI (FIXED)
  // ======================
  const epidemiologiValues = new Set<string>();

  if (patient.epidemiologi) {
    epidemiologiValues.add(patient.epidemiologi.value);
  }

  // ======================
  // RESULT
  // ======================
  return {
    patient: {
      id: patient.id,
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

      terapi:
        patient.terapi?.split(", ").filter((t: string) => terapi.includes(t)) ??
        [],

      outcome: patient.outcome,
      fifth_survivor: patient.fifth_survivor,
      tinggi: patient.tinggi,
      berat: patient.berat,
      nomor_telepon: patient.nomor_telepon,

      pemeriksaanFisikDetail: {
        description: patient.pemeriksaanFisikDetail?.description ?? "",
        images: patient.pemeriksaanFisikDetail?.pemeriksaanImages ?? [],
      },

      // ✅ INI YANG KEPUTUS
      tumorImages: patient.epidemiologi?.tumorImages ?? [],
      tumorDescription: patient.epidemiologi?.tumorDescription,
    },

    klinisValues: Array.from(klinisValues),
    klinisData,

    epidemiologiValues: Array.from(epidemiologiValues),

    terapiValues: terapi,
  };
};
