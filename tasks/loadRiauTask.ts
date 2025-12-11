/* eslint-disable */
// @ts-nocheck

import legendItems from "@/components/views/PatientMap/entities/LegendItems";
import { features } from "@/data/riau.json";
import { IChartStatusData } from "@/types/Chart";
import { Key } from "lucide-react";


class loadRiauTask {
  seState: React.Dispatch<React.SetStateAction<any>> | null = null;
  kabupaten = features;
  load = async (
    setState: React.Dispatch<React.SetStateAction<any>>,
    patientData: IChartStatusData[]
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
      const patientKabupaten: IChartStatusData = patients?.find(
        (patient) => patient.kabupaten === item.properties.NAME_2
      );
      item.properties.cancerCount = 0;
      item.properties.drop_out = 0;
      item.properties.meninggal = 0;
      item.properties.pindah_layanan = 0;
      item.properties.relaps_metastase = 0;
      item.properties.survivor = 0;
      if (patientKabupaten) {
        let allPatientCounts = 0;
        Object.entries(patientKabupaten).forEach(([key, value]) => {
          if (key === "kabupaten") {
            return
          }
          allPatientCounts += value
        })
        item.properties.cancerCount = allPatientCounts;
        item.properties.drop_out = patientKabupaten.drop_out
        item.properties.meninggal = patientKabupaten.meninggal
        item.properties.pindah_layanan = patientKabupaten.pindah_layanan
        item.properties.relaps_metastase = patientKabupaten.relaps_metastase
        item.properties.survivor = patientKabupaten.survivor
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
