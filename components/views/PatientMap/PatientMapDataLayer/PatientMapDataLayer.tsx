import { getAllPatientCountByStatus } from "@/data/patient";
import Cancer from "../Cancer";
import { IChartStatusData } from "@/types/Chart";

export default async function PatientMapDataLayer() {
  const data = await getAllPatientCountByStatus();

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto h-[300px] flex justify-center items-center flex-col gap-2">
        <div className="font-bold text-xl text-destructive">
          Terjadi Kesalahan.
        </div>
        <div>Gagal memuat map data pasien</div>
      </div>
    );
  }
  return <Cancer patientData={data as IChartStatusData[]} />;
}
