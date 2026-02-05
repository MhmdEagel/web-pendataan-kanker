"use client";

import { ColumnDef } from "@tanstack/react-table";

interface KlinisSicknessTable {
  kabupaten: string;
  pucat: number;
  pendarahan: number;
  splenomegali: number;
  demam: number;
  hepatomegali: number;
  tumor: number;
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
    accessorKey: "pucat",
    header: "Pucat",
  },
  {
    accessorKey: "pendarahan",
    header: "Pendarahan",
  },
  {
    accessorKey: "splenomegali",
    header: "Splenomegali",
  },
  {
    accessorKey: "demam",
    header: "Demam",
  },
  {
    accessorKey: "hepatomegali",
    header: "Hepatomegali",
  },
  {
    accessorKey: "tumor",
    header: "Tumor",
  },
];
