import { getAllPatientCountByStatus } from "@/data/patient";
import { columns } from "./column";
import { StatusDataTable } from "@/components/ui/status-data-table";

export default async function StatusTable() {
  const data = await getAllPatientCountByStatus();
  if (!data) {
    return null;
  }
  return (
    <div className="w-full pt-4 pb-10 px-8">
      <StatusDataTable columns={columns} data={data}  />
    </div>
  );
}
