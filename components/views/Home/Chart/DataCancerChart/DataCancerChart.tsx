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
  if (!data) {
    return;
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
