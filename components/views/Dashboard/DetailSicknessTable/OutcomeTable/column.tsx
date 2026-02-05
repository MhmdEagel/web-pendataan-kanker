"use client";

import { ColumnDef } from "@tanstack/react-table";

interface OutcomeTable {
  kabupaten: string;
  drop_out: number;
  relaps_metastase: number;
  meninggal: number;
  pindah_layanan: number;
  survivor: number;
}
export const columns: ColumnDef<OutcomeTable>[] = [
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
    accessorKey: "drop_out",
    header: "Drop Out",
  },
  {
    accessorKey: "relaps_metastase",
    header: "Relaps/Metastase",
  },
  {
    accessorKey: "meninggal",
    header: "Meninggal",
  },
  {
    accessorKey: "pindah_layanan",
    header: "Pindah Layanan",
  },
  {
    accessorKey: "survivor",
    header: "Survivor",
  },
];
