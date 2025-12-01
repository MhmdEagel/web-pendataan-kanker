"use client";

import { ColumnDef } from "@tanstack/react-table";

interface StatusTable {
    kabupaten: string;
    sembuh: number;
    dalam_pengobatan: number;
    meninggal: number
}

export const columns: ColumnDef<StatusTable>[] = [
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
    accessorKey: "sembuh",
    header: "Sembuh",
  },
  {
    accessorKey: "dalam_pengobatan",
    header: "Dalam Pengobatan",
  },
  {
    accessorKey: "meninggal",
    header: "Meninggal",
  },
];
