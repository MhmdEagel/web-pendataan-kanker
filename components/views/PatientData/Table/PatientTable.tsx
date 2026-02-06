import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import { FilterInput, getPatientData } from "@/data/patient";

export default async function DataPatientTable({
  filters,
}: {
  filters?: FilterInput;
}) {
  const data = await getPatientData(filters);
  if (!data) {
    return null;
  }
  return (
    <div className=" w-full pt-4 pb-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
