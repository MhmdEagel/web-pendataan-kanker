"use client";

import { ColumnDef } from "@tanstack/react-table";

interface DetailTable {
  drop_out: number;
  meninggal: number;
  pindah_layanan: number;
  relaps_metastase: number;
  survivor: number;
}

// DetailTable[]

export const columns: ColumnDef<DetailTable>[] = [
  {
    accessorKey: "drop_out",
    header: "Drop Out",
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
    accessorKey: "relaps_metastase",
    header: "Relaps/Metastase",
  },
  {
    accessorKey: "survivor",
    header: "Survivor",
  },
  {
    header: "Total",
    cell: ({ row }) => {
      const data = row.original;
      const total =
        data.drop_out +
        data.meninggal +
        data.pindah_layanan +
        data.relaps_metastase +
        data.survivor;

      return total;
    },
  },
];
