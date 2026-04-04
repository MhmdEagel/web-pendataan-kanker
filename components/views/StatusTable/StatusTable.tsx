import { getAllPatientCountByStatus } from "@/data/patient";
import { StatusDataTable } from "@/components/ui/status-data-table";
import { columns } from "./column";

export default async function StatusTable() {
  const data = await getAllPatientCountByStatus();
  if (!data || data.length === 0) {
    return (
      <div className="mx-auto h-[300px] flex justify-center items-center flex-col gap-2">
        <div className="font-bold text-xl text-destructive">Terjadi Kesalahan.</div>
        <div>Gagal memuat data pasien</div>
      </div>
    );
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
