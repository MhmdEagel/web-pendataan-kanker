"use client";

// import { deleteData } from "@/actions/delete-data";
import { Button } from "@/components/ui/button";
import { cn, generateDateString,  } from "@/lib/utils";
// import { Mustahik } from "@/types/Data";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink, Pen, Trash } from "lucide-react";
import Link from "next/link";
// import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Patient } from "@/types/Data";
import DeleteBtn from "./DeleteBtn/DeleteBtn";
type PatientTable = Omit<
  Patient,
  "pekerjaan_ayah" | "pekerjaan_ibu" | "diagnosa" | "terapi" | "fifth_survivor"
>;

export const columns: ColumnDef<PatientTable>[] = [
/*
multiple select
  {
    id: "select",
    cell: ({ row }) => (
      <div className="px-1">

        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
*/
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "jenis_kelamin",
    header: "Jenis Kelamin",
    cell: ({ row }) => {
    const value: string = row.getValue("jenis_kelamin")
    const label = value.split("_").join(" ")
    return <span className="capitalize">{label.toLowerCase()}</span>
  }
  },
  {
    accessorKey: "tanggal_lahir",
    header: "Tanggal Lahir",
    cell: ({ row }) => {
      const dateRow = row.getValue("tanggal_lahir") as Date;
      const formatted = generateDateString(dateRow);
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "asal_daerah",
    header: "Asal Daerah",
  },
  {
    accessorKey: "dokter",
    header: "Dokter",
  },
  {
    accessorKey: "rumah_sakit",
    header: "Rumah Sakit",
  },
  {
    accessorKey: "terapi",
    header: "Terapi",
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button size={"icon"} className="bg-foreground hover:bg-foreground/90">
              <ExternalLink />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="left" className="w-fit" >
            <div className="gap-4 flex flex-col">
              <DeleteBtn patientId={id} />
              {/* <Link href={`/dashboard/edit-data/${id}`}>
                <Button
                variant={"ghost"}
                >
                  <Pen />
                  Edit
                </Button>
              </Link> */}
              <Link href={`/dashboard/data-pasien/${id}`}>
                <Button
                  variant={"ghost"}
                >
                  <ExternalLink />
                  Detail
                </Button>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
