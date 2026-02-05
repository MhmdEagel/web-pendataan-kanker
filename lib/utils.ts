import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { kabupatenColor } from "@/components/constants/kabupaten.constant";
import { outcomeColor } from "@/components/constants/outcome.constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNotEmptyObject(obj: any) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  return Object.keys(obj).length === 0;
}

export function generateDateString(date: Date) {
  const dateString = dayjs(date).format("DD/MM/YYYY");
  return dateString;
}

export function getKabupatenColorAndId(
  kabupaten: string
): { id: string; fill: string } | null {
  const res = kabupatenColor.find((item) => item.label == kabupaten);
  if (!res) {
    return null;
  }
  return { id: res.id, fill: res.fill };
}

export function searchParamsToObject(
  params: Record<string, string | undefined>
) {
  const obj: Record<string, any> = {};
  for (const key in params) {
    if (params[key]) {
      obj[key] = params[key];
    }
  }
  return obj;
}

export function parseOutcomeData(filteredObj: {
  drop_out: number;
  meninggal: number;
  pindah_layanan: number;
  relaps_metastase: number;
  survivor: number;
}) {
  return Object.entries(filteredObj).map(([key, value]) => {
    const color = outcomeColor.filter((item) => item.id == key);
    return {
      outcome: key,
      patients: value,
      fill: color[0].fill,
    };
  });
}

export function parsedOutcomeDataWithoutColor(filteredObj: {
  drop_out: number;
  meninggal: number;
  pindah_layanan: number;
  relaps_metastase: number;
  survivor: number;
}) {
  return Object.entries(filteredObj).map(([key, value]) => {
    return {
      outcome: key,
      patients: value,
    };
  });
}

export function getOutcomePercentage(patient: number, total: number) {
  return Math.ceil((patient / total) * 100);
}

export function formatLabelToValueOutcome(label: string) {
  return label.toLowerCase().split(/[ /]+/).join("_");
}



