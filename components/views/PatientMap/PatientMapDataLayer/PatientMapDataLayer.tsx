import {
  getAllPatientCountByStatus,
} from "@/data/patient";
import Cancer from "../Cancer";
import { IChartStatusData } from "@/types/Chart";

export default async function PatientMapDataLayer() {
  const data = await getAllPatientCountByStatus()

  if (!data) {
    return null;
  }
  return <Cancer patientData={data as IChartStatusData[]} />;
}
