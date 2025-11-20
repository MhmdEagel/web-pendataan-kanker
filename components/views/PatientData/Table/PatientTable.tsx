import { DataTable } from "@/components/ui/data-table";
import { columns } from "./Columns";
import { getPatientData } from "@/data/patient";

export default async function DataPatientTable() {
  const data = await getPatientData();
  if (!data) {
    return null;
  }
  return (
    <div className="w-full pt-4 pb-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
