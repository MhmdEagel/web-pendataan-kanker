/* eslint-disable */
// @ts-nocheck

import legendItems from "@/components/views/PatientMap/entities/LegendItems";
import { features } from "@/data/riau.json";
interface IPatientData {
  kabupaten: string;
  patients: number;
}

class loadRiauTask {
  seState: React.Dispatch<React.SetStateAction<any>> | null = null;
  kabupaten = features;
  load = async (
    setState: React.Dispatch<React.SetStateAction<any>>,
    patientData: IPatientData[]
  ) => {
    this.seState = setState;
    setState(features);
    this.#processCancerData(patientData);
  };

  #processCancerData = (
    patients:
      | {
          kabupaten: string | undefined;
          patients: number;
        }[]
      | null
  ) => {
    this.kabupaten.forEach((item) => {
      const patientKabupaten = patients?.find(
        (patient) => patient.kabupaten === item.properties.NAME_2
      );
      item.properties.cancerCount = 0;
      if (patientKabupaten) {
        const cancerCount = patientKabupaten.patients;
        item.properties.cancerCount = cancerCount;
      }
      this.#setCountryColor(item);
    });

    this.seState!(this.kabupaten);
  };

  #setCountryColor = (kabupaten) => {
    const legendItem = legendItems.find((item) =>
      item.isFor(kabupaten.properties.cancerCount)
    );
    if (legendItem != null) kabupaten.properties.color = legendItem.color;
  };
}

export default loadRiauTask;
