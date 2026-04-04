import { getAllPatientCountByStatus } from "@/data/patient";
import { IChartStatusData } from "@/types/Chart";
import DetailChartContainer from "../DetailChartContainer/DetailChartContainer";
export default async function DataCancerLayer() {
  const data = await getAllPatientCountByStatus();
  if (!data) {
    return null;
  }
  return (
    <>
    <DetailChartContainer data={data as IChartStatusData[]} />
    </>
  );
}
