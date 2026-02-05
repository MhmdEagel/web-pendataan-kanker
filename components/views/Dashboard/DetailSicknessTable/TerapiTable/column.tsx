"use client";

import { ColumnDef } from "@tanstack/react-table";

interface TerapiSicknessTable {
  kabupaten: string;
  operasi: number;
  radiasi: number;
  kemotrapi: number;
  transplantasi: number;
}
export const columns: ColumnDef<TerapiSicknessTable>[] = [
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
    accessorKey: "operasi",
    header: "Operasi",
  },
  {
    accessorKey: "radiasi",
    header: "Radiasi",
  },
  {
    accessorKey: "kemotrapi",
    header: "Kemotrapi",
  },
  {
    accessorKey: "transplantasi",
    header: "Transplantasi",
  },
];
