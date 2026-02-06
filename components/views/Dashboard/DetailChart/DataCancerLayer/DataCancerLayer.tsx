import { getAllPatientCountByStatus } from "@/data/patient";
import { IChartStatusData } from "@/types/Chart";
import DetailTable from "../../DetailTable/DetailTable";
import DetailChartBar from "../DetailChartBar";
import { Button } from "@/components/ui/button";
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
