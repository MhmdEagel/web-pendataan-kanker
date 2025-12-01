import { getPatientCountByKabupaten } from "@/data/patient";
import Cancer from "../Cancer";

export default async function PatientMapDataLayer() {
  const data = await getPatientCountByKabupaten();
  if (!data) {
    return null;
  }
  return <Cancer patientData={data} />;
}
