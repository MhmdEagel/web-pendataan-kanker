import { addPatientData } from "@/actions/add-patient-data";
import { newPatientSchema } from "@/schemas/new_patient";
import { NewPatient } from "@/types/Data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useStorePatientData() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(newPatientSchema),
  });
  const handleNewPatientData = async (data: NewPatient) => {
    setIsPending(true);
    const res = await addPatientData(data);
    if (res.error) {
      setIsPending(false);
      toast.error(res.error);
      return;
    }
    setIsPending(false);
    toast.success(res.success);
    router.push("/dashboard/data-pasien")
  };
  return {
    isPending,
    form,
    handleNewPatientData,
  };
}
