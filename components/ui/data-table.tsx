"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  Table as TableType,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { isNotEmptyObject } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { toast } from "sonner";
import { Spinner } from "./spinner";
import { Patient } from "@/types/Data";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  const selectedRowsData = Object.values(
    table.getSelectedRowModel().rowsById
  ).map((row) => row.original as Patient);

  const selectedRowsId = selectedRowsData.map((row) => row.id);


  return (
    <div>
      {!isNotEmptyObject(rowSelection) ? (
        <div className="flex justify-between mb-4">
          <div className="space-x-2">
            <Button
              className="bg-foreground hover:bg-foreground/90"
              onClick={() => table.toggleAllPageRowsSelected(true)}
            >
              Pilih Semua
            </Button>
            <Button
              className=""
              onClick={() => table.toggleAllPageRowsSelected(false)}
              variant={"outline"}
            >
              Batal
            </Button>
          </div>
        </div>
      ) : null}
      <div className="overflow-hidden rounded-xl border border-gray-400">
        <Table>
          <TableHeader className="bg-[#f4f4f4d1]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-b border-gray-400 "
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className=" border-r border-gray-400 font-bold text-black text-center last:border-r-0"
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-b border-gray-400"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className="border-r  border-gray-400 text-black text-center last:border-r-0"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center font-bold text-black"
                >
                  Data tidak ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-4 lg:flex-row items-center justify-center lg:justify-between lg:space-x-2 p-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Baris per halaman</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {!isNotEmptyObject(rowSelection) ? (
          <div className="text-muted-foreground  text-sm">
            {table.getFilteredSelectedRowModel().rows.length} dari{" "}
            {table.getFilteredRowModel().rows.length} baris terpilih.
          </div>
        ) : null}
        <div className="flex items-center space-x-2">
          <Button
            size="icon"
            className="bg-foreground hover:bg-foreground/90"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium">
            Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
            {table.getPageCount()}
          </div>
          <Button
            className="bg-foreground hover:bg-foreground/90"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

// function DeleteRowsBtn({
//   selectedRowsId,
//   table,
// }: {
//   selectedRowsId: (string | undefined)[];
//   table: TableType<any>;
// }) {
//   const [open, setOpen] = useState(false);
//   const [isPending, setIsPending] = useState(false);

//   console.log(selectedRowsId);

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger asChild>
//         <Button variant={"destructive"}>Hapus</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
//           <AlertDialogDescription>
//             data-data yang akan dihapus tidak dapat dikembalikan
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Batal</AlertDialogCancel>
//           <AlertDialogAction
//             disabled={isPending}
//             onClick={async () => {
//               setIsPending(true);
//               const res = await deleteMultipleMustahikDataById(selectedRowsId);
//               setIsPending(false);
//               if (res?.error && !res.success) {
//                 toast.error(res.error);
//                 table.toggleAllPageRowsSelected(false);
//                 setOpen(false);
//                 return;
//               }
//               toast.success(res?.success);
//               table.toggleAllPageRowsSelected(false);
//               setOpen(false);
//             }}
//             className="bg-foreground hover:bg-foreground/90"
//           >
//             {isPending ? <Spinner color="white" /> : "Oke"}
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
