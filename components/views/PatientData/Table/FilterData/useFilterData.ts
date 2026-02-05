import { filterSchema } from "@/schemas/filter-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

export const useFilterData = () => {
  const router = useRouter();
  

  const form = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      NIK: "",
      nama: "",
      asal_daerah: "",
      dokter: "",
      outcome: "",
      klinis: "",
      fifth_survivor: "",
      terapi: "",
      penyelidikan_epidemiologi: "",
    },
  });

  const handleFilterData = (data: z.infer<typeof filterSchema>) => {
    console.log(data);
    const query = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        if (value instanceof Date) {
          query.set(key, value.toISOString());
        } else {
          query.set(key, String(value));
        }
      }
    });
    router.push(`/dashboard/data-pasien?${query.toString()}`);
    form.reset();
  };
  return {
    form,
    handleFilterData,
    router,
  };
};
