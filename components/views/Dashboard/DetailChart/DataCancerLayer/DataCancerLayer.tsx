import { getAllPatientCountByStatus } from "@/data/patient";
import { IChartStatusData } from "@/types/Chart";
import { DetailChartBar } from "../DetailCancerChart/DetailCancerBarChart";
import DetailTable from "../../DetailTable/DetailTable";
export default async function DataCancerLayer() {
  const data = await getAllPatientCountByStatus();
  if (!data) {
    return null;
  }
  return (
    <>
      <DetailChartBar chartData={data as IChartStatusData[]} />
      <DetailTable data={data as IChartStatusData[]} />
    </>
  );
}
