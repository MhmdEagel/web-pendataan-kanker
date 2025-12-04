"use client"
import { StatusDataTable } from "@/components/ui/status-data-table";
import { columns } from "./column";
import { IChartStatusData } from "@/types/Chart";
import { useSearchParams } from "next/navigation";

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
    <div className="w-full mt-4 px-8">
      <StatusDataTable columns={columns} data={filteredData} />
    </div>
  );
}
