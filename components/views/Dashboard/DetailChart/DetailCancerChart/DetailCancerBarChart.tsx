"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardHeader,

} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/detail-chart";
import { IChartStatusData } from "@/types/Chart";
import { useSearchParams } from "next/navigation";
import { parseOutcomeData } from "@/lib/utils";

export const description = "A bar chart with an active bar";

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
    (item) => item.kabupaten === kabupatenParams
  );
  const { kabupaten, ...rest } = filteredData![0];
  const parsedData = parseOutcomeData(rest);
  return (
    <Card>
      <CardHeader>
        <div className="text-lg font-bold">{kabupatenParams} - Outcome</div>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px] mx-auto" config={chartConfig}>
          <BarChart accessibilityLayer data={parsedData}>
            <CartesianGrid vertical={false} />
            <XAxis
              
              dataKey="outcome"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <Bar dataKey="patients" strokeWidth={1} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
