import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import DataPatientTable from "./Table/PatientTable";
import FilterData from "./Table/FilterData/FilterData";

export default function PatientData() {
  return (
    <div className="space-y-4">
      <FilterData />
      <div>
        <Link className="mb-4" href={"/dashboard/data-pasien/tambah-data"}>
          <Button className="bg-blue-600 hover:bg-primary/70">
            <Plus /> Tambah woi
          </Button>
        </Link>
        <Suspense
          fallback={
            <Skeleton className="w-full h-[420px] rounded-xl mt-4 bg-slate-200" />
          }
        >
          <DataPatientTable />
        </Suspense>
      </div>
    </div>
  );
}
