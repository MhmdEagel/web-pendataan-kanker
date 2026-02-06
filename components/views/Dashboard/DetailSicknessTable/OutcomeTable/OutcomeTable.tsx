import { OutcomeDataTable } from "@/components/ui/detail-sickness/outcome-data-table";
import { columns } from "./column";
import { getAllPatientOutcomeCountByGender } from "@/data/patient";

export default async function OutcomeTable({
  gender,
}: {
  gender: "LAKI_LAKI" | "PEREMPUAN";
}) {
  const data = await getAllPatientOutcomeCountByGender(gender);
  if (!data) {
    return null;
  }
  return (
    <div className="print:p-0 pt-4 pb-10 px-8">
      <OutcomeDataTable
        columns={columns}
        data={
          data as {
            kabupaten: string;
            drop_out: number;
            relaps_metastase: number;
            meninggal: number;
            pindah_layanan: number;
            survivor: number;
          }[]
        }
      />
    </div>
  );
}
