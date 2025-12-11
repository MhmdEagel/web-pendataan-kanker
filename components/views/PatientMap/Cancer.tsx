"use client";

import { useEffect, useState } from "react";
import Loading from "./Loading";
import Legend from "./Legend";
import loadRiauTask from "@/tasks/loadRiauTask";
import dynamic from "next/dynamic";
import legendItems from "./entities/LegendItems";
import { IChartStatusData } from "@/types/Chart";

const CancerMap = dynamic(() => import("./CancerMap"), {
  ssr: false
});



export default function Cancer({
  patientData,
}: {
  patientData: IChartStatusData[];
}) {
  const [kabupaten, setKabupaten] = useState([]);
  const legendItemsInReverse = [...legendItems].reverse();

  const load = async (patientData: IChartStatusData[]) => {
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
