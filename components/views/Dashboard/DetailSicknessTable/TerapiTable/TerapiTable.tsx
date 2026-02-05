import { TerapiDataTable } from "@/components/ui/detail-sickness/terapi-data-table";
import { columns } from "./column";
import { getPatientCountByTerapiPerKabupaten } from "@/data/patient";

export default async function TerapiTable({
  gender,
}: {
  gender: "LAKI_LAKI" | "PEREMPUAN";
}) {
  const data = await getPatientCountByTerapiPerKabupaten(gender);
  if (!data) {
    return null;
  }
  return (
    <div className="w-full pt-4 pb-10 px-8">
      <TerapiDataTable
        columns={columns}
        data={
          data as {
            kabupaten: string;
            operasi: number;
            radiasi: number;
            kemotrapi: number;
            transplantasi: number;
          }[]
        }
      />
    </div>
  );
}
