import { getAllPatientCount, getPatientCount } from "@/data/patient";
import CancerChart from "../CancerChart";
import { IChartData } from "../CancerChart/CancerChart";
export default async function DataCancerChart() {
  const data: IChartData[] | null = await getPatientCount();
  const total = await getAllPatientCount();
  if (!data) {
    return;
  }
  return (
    <>
      <CancerChart chartData={data} />
      <div className="text-center sm:text-left">
        <div className="text-xl mb-2">Total Penderita Kanker</div>
        <div className="text-3xl font-bold">{total}</div>
      </div>
    </>
  );
}
