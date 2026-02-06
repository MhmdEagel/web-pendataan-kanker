import { getAllPatientCountByStatus } from "@/data/patient";
import { StatusDataTable } from "@/components/ui/status-data-table";
import { columns } from "./column";

export default async function StatusTable() {
  const data = await getAllPatientCountByStatus();
  if (!data) {
    return null;
  }
  return (
    <div className="print:p-0 pt-4 pb-10 px-8">
      <StatusDataTable
        columns={columns}
        data={
          data as {
            kabupaten: string;
            drop_out: number;
            meninggal: number;
            pindah_layanan: number;
            relaps_metastase: number;
            survivor: number;
          }[]
        }
      />
    </div>
  );
}
