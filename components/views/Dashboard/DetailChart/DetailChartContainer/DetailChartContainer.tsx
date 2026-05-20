"use client";

import { IChartStatusData } from "@/types/Chart";
import DetailChartBar from "../DetailChartBar";
import DetailTable from "../../DetailTable/DetailTable";
import { Button } from "@/components/ui/button";

export default function DetailChartContainer({
  data,
}: {
  data: IChartStatusData[];
}) {
  return (
    <div className="mb-32">
      <DetailChartBar chartData={data as IChartStatusData[]} />
      <DetailTable data={data as IChartStatusData[]} />
      <Button onClick={() => window.print()} className="mt-4 mx-auto block print:hidden">
        Download Data
      </Button>
    </div>
  );
}
