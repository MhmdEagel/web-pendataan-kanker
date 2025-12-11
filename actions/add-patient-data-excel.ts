"use server";

import { db } from "@/lib/db";
import { NewPatient } from "@/types/Data";

export const tambahDataExcel = async (data: NewPatient[]) => {
  try {
    await db.patient.createMany({
      data,
    });
    return { success: "Berhasil menambahkan data", error: null };
  } catch (e) {
    console.error((e as Error).message);
    return { success: null, error: "Terjadi kesalahan" };
  }
};