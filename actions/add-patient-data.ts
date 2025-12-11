"use server";
import { db } from "@/lib/db";
import { NewPatient } from "@/types/Data";
import { revalidatePath } from "next/cache";


export async function addPatientData(data: NewPatient) {
  try {
    await db.patient.create({
      data: data,
    });
    revalidatePath("/dashboard")
    return { success: "Data berhasil ditambah", error: null };
  } catch (e) {
    return {success: null, error: (e as Error).message}
  }
}
