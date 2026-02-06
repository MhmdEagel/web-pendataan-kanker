import { getAllPatientCountEpidemiologiByGender } from "@/data/patient";
import { columns } from "./column";
import { EpidemiologiDataTable } from "@/components/ui/detail-sickness/epidemiologi-data-table";

export default async function EpidemiologiTable({
  gender,
}: {
  gender: "LAKI_LAKI" | "PEREMPUAN";
}) {
  const data = await getAllPatientCountEpidemiologiByGender(gender);
  if (!data) {
    return null;
  }
  return (
    <div className="print:p-0 pt-4 pb-10 px-8">
      <EpidemiologiDataTable
        columns={columns}
        data={
          data as {
            kabupaten: string;
            pucat: number;
            pendarahan: number;
            splenomegali: number;
            demam: number;
            hepatomegali: number;
            tumor: number;
          }[]
        }
      />
    </div>
  );
}
