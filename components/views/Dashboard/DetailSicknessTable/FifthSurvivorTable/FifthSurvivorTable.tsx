import { getAllPatientFifthSurvivorCountByGender } from "@/data/patient";
import { columns } from "./column";
import { FifthSurvivorDataTable } from "@/components/ui/detail-sickness/fifth-survivor-data-table";

export default async function FifthSurvivorTable({
  gender,
}: {
  gender: "LAKI_LAKI" | "PEREMPUAN";
}) {
  const data = await getAllPatientFifthSurvivorCountByGender(gender);
  console.log(data);
  if (!data) {
    return null;
  }
  return (
    <div className="print:p-0 pt-4 pb-10 px-8">
      <FifthSurvivorDataTable
        columns={columns}
        data={
          data as {
            kabupaten: string;
            YA: number;
            TIDAK: number;
          }[]
        }
      />
    </div>
  );
}
