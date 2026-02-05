"use client";

import { ColumnDef } from "@tanstack/react-table";

interface KlinisSicknessTable {
  kabupaten: string;
  YA: number;
  TIDAK: number
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
    accessorKey: "YA",
    header: "Ya",
  },
  {
    accessorKey: "TIDAK",
    header: "Tidak",
  },

];
