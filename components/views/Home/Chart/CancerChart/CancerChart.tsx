"use client";

import { Pie, PieChart, ResponsiveContainer } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export const description = "A pie chart with a legend";

export interface IChartData {
  kabupaten: string | undefined;
  patients: number;
  fill: string | undefined
}

const chartConfig = {
  patients: {
    label: "Patients",
  },
  bengkalis: {
    label: "Bengkalis",
    color: "var(--chart-1)",
  },
  indragiri_hilir: {
    label: "Indragiri Hilir",
    color: "var(--chart-2)",
  },
  indragiri_hulu: {
    label: "Indragiri Hulu",
    color: "var(--chart-2)",
  },
  kampar: {
    label: "Kampar",
    color: "var(--chart-3)",
  },
  kepulauan_meranti: {
    label: "Kepulauan Meranti",
    color: "var(--chart-4)",
  },
  kuantan_singingi: {
    label: "Kuantan Singingi",
  },
  pelalawan: {
    label: "Pelalawan",
  },
  rokan_hilir: {
    label: "Rokan Hilir",
  },
  rokan_hulu: {
    label: "Rokan Hulu",
  },
  siak: {
    label: "Siak",
  },
  dumai: {
    label: "Dumai",
  },
  pekanbaru: {
    label: "Pekanbaru",
  },
} satisfies ChartConfig;

export function CancerChart({chartData}: {chartData: IChartData[] | null}) {
  return (
    <ResponsiveContainer width={550}>
      <ChartContainer config={chartConfig} className="max-h-[420px]">
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="min-w-42"
                nameKey="kabupaten"
                hideLabel
              />
            }
          />
          <Pie data={chartData!} label dataKey="patients" />
          <ChartLegend
            content={<ChartLegendContent nameKey="kabupaten" />}
            className="-translate-y-2 flex-wrap gap-2  *:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
