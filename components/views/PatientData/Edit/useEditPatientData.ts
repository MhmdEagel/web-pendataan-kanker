import { addPatientData } from "@/actions/add-patient-data";
import { PatientExtended } from "@/types/Data";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import customParseFormat from "dayjs/plugin/customParseFormat";
import z from "zod";
import { Gender } from "@prisma/client";
import { editPatientSchema } from "@/schemas/edit_patient";
import { editPatientData } from "@/actions/edit-patient-data";

dayjs.extend(customParseFormat);

export function useEditPatientData({
  patientData,
}: {
  patientData: PatientExtended;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const epidemiologi = patientData.epidemiologiValues[0].split(",") as (
    | "PUCAT"
    | "PENDARAHAN"
    | "SPLENONEGALI"
    | "DEMAM"
    | "HEPALOMEGALI"
    | "TUMOR"
    | undefined
  )[];


  const form = useForm({
    resolver: zodResolver(editPatientSchema),
    defaultValues: {
      no_register: patientData.patient.no_register,
      no_rm: patientData.patient.no_rm,
      nama: patientData.patient.nama,
      nik: patientData.patient.nik,
      jenis_kelamin: patientData.patient.jenis_kelamin as Gender,
      tanggal_lahir: new Date(patientData.patient.tanggal_lahir),
      tanggal_input: new Date(patientData.patient.tanggal_input),
      asal_daerah: patientData.patient.asal_daerah,
      pekerjaan_ayah: patientData.patient.pekerjaan_ayah,
      pekerjaan_ibu: patientData.patient.pekerjaan_ibu,
      nomor_telepon: patientData.patient.nomor_telepon,
      dokter: patientData.patient.dokter,
      rumah_sakit: patientData.patient.rumah_sakit,
      diagnosa: patientData.patient.diagnosa,
      outcome: patientData.patient.outcome,
      fifth_survivor: patientData.patient.fifth_survivor,

      tinggi: patientData.patient.tinggi,
      berat: patientData.patient.berat,

      // ===== ENUM / ARRAY =====
      klinisValues:
        (patientData.klinisValues as Array<
          | "LABORATORIUM"
          | "RADIOLOGI"
          | "PATOLOGI_ANATOMI"
          | "PEMERIKSAAN_JANTUNG"
        >) ?? [],
      penyelidikan_epidemiologi: epidemiologi ?? [],
      terapi: patientData.terapiValues ?? [],
      // ===== IMAGE INPUT (HARUS ARRAY, TAwPI KOSONG) =====
      klinisImages: {
        LABORATORIUM: [],
        RADIOLOGI: [],
        PATOLOGI_ANATOMI: [],
        PEMERIKSAAN_JANTUNG: [],
      },
      klinisCaptions: {
        LABORATORIUM: patientData.klinisData.LABORATORIUM?.caption || "",
        RADIOLOGI: patientData.klinisData.RADIOLOGI?.caption || "",
        PATOLOGI_ANATOMI: patientData.klinisData.PATOLOGI_ANATOMI?.caption || "",
        PEMERIKSAAN_JANTUNG: patientData.klinisData.PEMERIKSAAN_JANTUNG?.caption || "",
      },
      pemeriksaanFisikImages: [],
      pemeriksaanFisikCaption: patientData.patient.pemeriksaanFisikDetail?.description || "",
      tumorImages: [],
      tumorDescription: patientData.patient.tumorDescription || "",
      fifth_survivor_tahun: patientData.patient.fifth_survivor_tahun,
      deletedKlinisImageIds: [],
      deletedPemeriksaanFisikImageIds: [],
      deletedTumorImageIds: [],
    },
  });


  const handleEditPatientData = async (
    data: z.infer<typeof editPatientSchema>,
  ) => {
    setIsPending(true);
    const res = await editPatientData(data, patientData.patient.id);
    if (res.error) {
      setIsPending(false);
      toast.error(res.error);
      return;
    }
    setIsPending(false);
    toast.success(res.success);
    // router.push("/dashboard/data-pasien");
  };

  return {
    isPending,
    form,
    handleEditPatientData,
  };
}
