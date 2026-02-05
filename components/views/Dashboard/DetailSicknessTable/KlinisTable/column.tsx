"use client";

import { ColumnDef } from "@tanstack/react-table";

interface KlinisSicknessTable {
  kabupaten: string;
  laboratorium: number;
  radiologi: number;
  patologi_anatomi: number;
  pemeriksaan_jantung: number;
}
export const columns: ColumnDef<KlinisSicknessTable>[] = [
  {
    id: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kabupaten",
    header: "Kabupaten / Kota",
  },
  {
    accessorKey: "laboratorium",
    header: "Laboratorium",
  },
  {
    accessorKey: "radiologi",
    header: "Radiologi",
  },
  {
    accessorKey: "patologi_anatomi",
    header: "Patologi Anatomi",
  },
  {
    accessorKey: "pemeriksaan_jantung",
    header: "Pemeriksaan Jantung",
  },
];
