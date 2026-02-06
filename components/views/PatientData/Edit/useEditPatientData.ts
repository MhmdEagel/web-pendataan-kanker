import { addPatientData } from "@/actions/add-patient-data";
import { tambahDataExcel } from "@/actions/add-patient-data-excel";
import { newPatientSchema } from "@/schemas/new_patient";
import { NewPatient, Patient } from "@/types/Data";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import customParseFormat from "dayjs/plugin/customParseFormat";
import z from "zod";

dayjs.extend(customParseFormat);

export function useEditPatientData() {
  const [isPending, setIsPending] = useState(false);
  const [activeTab, setActiveTab] = useState("form_tambah");
  const router = useRouter();
  const [files, setFiles] = useState<File[] | undefined>();
  const [isPendingUpload, setIsPendingUpload] = useState(false);

  const form = useForm({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      klinisValues: [],
      klinisImages: {
        LABORATORIUM: [],
        RADIOLOGI: [],
        PATOLOGI_ANATOMI: [],
        PEMERIKSAAN_JANTUNG: [],
      },
      penyelidikan_epidemiologi: [],
      pemeriksaanFisikImages: [],
      terapi: [],
    },
  });
  const handleNewPatientData = async (
    data: z.infer<typeof newPatientSchema>,
  ) => {
    setIsPending(true);
    const res = await addPatientData(data);
    if (res.error) {
      setIsPending(false);
      toast.error(res.error);
      return;
    }
    setIsPending(false);
    toast.success(res.success);
    router.push("/dashboard/data-pasien");
  };
  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (!file) {
      return null;
    }

    setFiles(files);
    const reader = new FileReader();

    reader.onloadstart = () => {
      setIsPendingUpload(true);
    };

    reader.onload = async (e) => {
      const binaryString = e.target?.result as string;
      const workbook = XLSX.read(binaryString, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: NewPatient[] = XLSX.utils.sheet_to_json(worksheet);
      const formattedData = jsonData.map((patient) => {
        return {
          ...patient,
          tanggal_lahir: dayjs(patient.tanggal_lahir).toDate(),
        };
      });
      const res = await tambahDataExcel(formattedData);
      if (res.success && !res.error) {
        toast.success(res.success);
        setIsPendingUpload(false);
        router.replace("/dashboard");
        return;
      }
      toast.error(res.error);
    };

    reader.readAsArrayBuffer(file);
  };
  return {
    handleDrop,
    isPending,
    form,
    handleNewPatientData,
    activeTab,
    setActiveTab,
    files,
    isPendingUpload,
  };
}
