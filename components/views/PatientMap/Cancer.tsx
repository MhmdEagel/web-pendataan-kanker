"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import Legend from "./Legend";
import loadRiauTask from "@/tasks/loadRiauTask";
import dynamic from "next/dynamic";
import legendItems from "./entities/LegendItems";

const CancerMap = dynamic(() => import("./CancerMap"), {
  ssr: false
});

interface IPatientData {
  kabupaten: string;
  patients: number;
}

export default function Cancer({
  patientData,
}: {
  patientData: IPatientData[];
}) {
  const [kabupaten, setKabupaten] = useState(["Pekanbaru"]);
  const legendItemsInReverse = [...legendItems].reverse();

  const load = async (patientData: IPatientData[]) => {
    const loadRiauMapTask = new loadRiauTask();
    await loadRiauMapTask.load(setKabupaten, patientData);
  };

  useEffect(() => {
    load(patientData);
  }, [patientData]);

  return (
    <div>
      {kabupaten.length === 0 ? (
        <Loading />
      ) : (
        <div className="w-full h-[440px]">
          <CancerMap kabupaten={kabupaten} />
          <Legend legendItems={legendItemsInReverse} />
        </div>
      )}
    </div>
  );
}
