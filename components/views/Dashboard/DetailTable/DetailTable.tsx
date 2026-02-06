"use client"
import { columns } from "./column";
import { IChartStatusData } from "@/types/Chart";
import { useSearchParams } from "next/navigation";
import { DetailDataTable } from "@/components/ui/detail-table";

export default function DetailTable({ data }: { data: IChartStatusData[] }) {
  const searchParams = useSearchParams();
  const kabupatenParams = searchParams.get("kabupaten");
  const filteredData = data?.filter(
    (item) => item.kabupaten === kabupatenParams
  );
  if (!data) {
    return null;
}
  return (
    <div className="w-full mt-4 px-1 sm:px-8">
      <DetailDataTable columns={columns} data={filteredData} />

    </div>
  );
}
