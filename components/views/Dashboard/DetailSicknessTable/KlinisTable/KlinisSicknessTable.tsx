import { getAllPatientCountByKlinis } from "@/data/patient";
import { columns } from "./column";
import { KlinisSicknessDataTable } from "@/components/ui/detail-sickness/klinis-data-table";

export default async function KlinisSicknessTable({gender}: {gender: "LAKI_LAKI" | "PEREMPUAN"}) {
  const data = await getAllPatientCountByKlinis(gender);
  if (!data) {
    return null;
  }
  return (
    <div className="w-full pt-4 pb-10 px-8">
      <KlinisSicknessDataTable
        columns={columns}
        data={
          data as {
            kabupaten: string;
            laboratorium: number;
            radiologi: number;
            patologi_anatomi: number;
            pemeriksaan_jantung: number;
          }[]
        }
      />
    </div>
  );
}
