"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/detail-chart";
import { IChartStatusData } from "@/types/Chart";
import { useSearchParams } from "next/navigation";
import {
  formatLabelToValueOutcome,
  getOutcomePercentage,
  parseOutcomeData,
} from "@/lib/utils";
const chartConfig = {
  patients: {
    label: "Patients",
  },
  drop_out: {
    label: "Drop Out",
    color: "#FF6B6B",
  },
  meninggal: {
    label: "Meninggal",
    color: "#4D96FF",
  },
  pindah_layanan: {
    label: "Pindah Layanan",
    color: "#6BCB77",
  },
  relaps_metastase: {
    label: "Relaps/Metastase",
    color: "#FFD93D",
  },
  survivor: {
    label: "Survivor",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function DetailChartBar({
  chartData,
}: {
  chartData: IChartStatusData[] | null;
}) {
  const searchParams = useSearchParams();
  const kabupatenParams = searchParams.get("kabupaten");
  const filteredData = chartData?.filter(
    (item) => item.kabupaten === kabupatenParams,
  );
  const { kabupaten, ...rest } = filteredData![0];
  const parsedData = parseOutcomeData(rest);
  let totalPatients = 0;
  parsedData.forEach((item) => {
    totalPatients += item.patients;
  });

  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-bold">{kabupatenParams} - Outcome</div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="md:h-[300px] mx-auto print:mx-auto print:flex print:justify-center print:items-center print:h-[280px]"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={parsedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="outcome"
              tickLine={false}
              tickMargin={14}
              axisLine={false}
              interval={0}
              minTickGap={30}
              tick={(props) => {
                const { x, y, payload } = props;
                const cfg = chartConfig[payload.value];
                const outcomeObj = parsedData.filter(
                  (item) =>
                    item.outcome === formatLabelToValueOutcome(cfg.label),
                )[0];
                const percentage = getOutcomePercentage(
                  outcomeObj.patients,
                  totalPatients,
                );
                return (
                  <text x={x} y={y} textAnchor="middle" fill="black">
                    {/* Baris pertama (persen) */}
                    <tspan
                      x={x}
                      dy="0"
                      fontSize={window.innerWidth < 400 ? 10 : 14}
                      fontWeight={700}
                    >
                      {percentage}%
                    </tspan>
                    {/* Baris kedua (judul outcome) */}
                    <tspan
                      x={x}
                      dy="15"
                      fontSize={
                        window.innerWidth < 556
                          ? 6
                          : window.innerHeight < 600
                            ? 7
                            : 12
                      }
                    >
                      {cfg.label}
                    </tspan>
                  </text>
                );
              }}
            />
            <Bar dataKey="patients" strokeWidth={1} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
