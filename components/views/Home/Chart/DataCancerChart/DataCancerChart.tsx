import {
  getAllPatientCount,
  getAllPatientCountByStatus,
  getPatientCountWithFill,
} from "@/data/patient";
import CancerChart from "../CancerChart";
import { IChartData, IChartStatusData } from "@/types/Chart";
export default async function DataCancerChart() {
  const data: IChartData[] | null = await getPatientCountWithFill();
  const total = await getAllPatientCount();
  const outome = await getAllPatientCountByStatus();
  if (!data || data.length === 0) {
    return (
      <div className="mx-auto h-[300px] flex justify-center items-center flex-col gap-2">
        <div className="font-bold text-xl text-destructive">
          Terjadi Kesalahan.
        </div>
        <div>Gagal memuat chart data pasien</div>
      </div>
    );
  }
  return (
    <>
      <CancerChart
        chartData={data}
        outcome={outome as IChartStatusData[] | null}
      />
      <div className="text-center mb-8">
        <div className="text-lg">Total Penderita Kanker</div>
        <div className="text-3xl font-bold">{total}</div>
      </div>
    </>
  );
}
