import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import FilterData from "@/components/views/PatientData/Table/FilterData/FilterData";
import DataPatientTable from "@/components/views/PatientData/Table/PatientTable";
import { searchParamsToObject } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function PatientDataPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const urlSearchParams = await searchParams;
  const filters = searchParamsToObject(urlSearchParams)
  return (
    <div className="space-y-4">
      <div>
        <FilterData />
        <Link className="mb-4" href={"/dashboard/data-pasien/tambah-data"}>
          <Button className="bg-primary hover:bg-primary/70">
            <Plus /> Tambah Data
          </Button>
        </Link>
        <Suspense
          fallback={
            <Skeleton className="w-full h-[420px] rounded-xl mt-4 bg-slate-200" />
          }
        >
          <DataPatientTable filters={filters} />
        </Suspense>
      </div>
    </div>
  );
}
