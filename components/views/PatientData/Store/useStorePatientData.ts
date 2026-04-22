import { addPatientData } from "@/actions/add-patient-data";
import { newPatientSchema } from "@/schemas/new_patient";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import customParseFormat from "dayjs/plugin/customParseFormat";
import z from "zod";

dayjs.extend(customParseFormat);

export function useStorePatientData() {
  const [isPending, setIsPending] = useState(false);
  const [activeTab, setActiveTab] = useState("form_tambah");
  const router = useRouter();


  const form = useForm({
    resolver: zodResolver(newPatientSchema),
    defaultValues: {
      fifth_survivor: "",
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
  
  return {
    isPending,
    form,
    handleNewPatientData,
    activeTab,
    setActiveTab,    
  };
}
