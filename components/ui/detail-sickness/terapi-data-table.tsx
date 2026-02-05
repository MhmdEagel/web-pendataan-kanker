"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Table as TableType,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const useGetTotalByColumnId = (table: TableType<any>, columnId: string) => {
  const result = useMemo(() => {
    const Total = table
      .getCoreRowModel()
      .flatRows.map((row) => row.getValue(columnId));
    return Array.from(Total);
  }, [table, columnId]);
  let total = 0;
  result.forEach((item) => {
    total += item as number;
  });
  return total;
};

export function TerapiDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const operasiTotal = useGetTotalByColumnId(table, "operasi");
  const radiasiTotal = useGetTotalByColumnId(table, "radiasi");
  const kemotrapiTotal = useGetTotalByColumnId(table, "kemotrapi");
  const transplantasiTotal = useGetTotalByColumnId(table, "transplantasi");

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-gray-400">
        <Table>
          <TableHeader className="bg-[#f4f4f4d1]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-b border-gray-400"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    className="border-r border-gray-400 font-bold text-black text-center last:border-r-0"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
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
                      className="border-r border-gray-400 text-black text-center last:border-r-0"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
            <TableRow className="border-b border-gray-400">
              <TableCell
                colSpan={2}
                className="text-center border-r border-gray-400"
              >
                Total Keseluruhan
              </TableCell>
              <TableCell className="text-center border-r border-gray-400">
                {operasiTotal}
              </TableCell>
              <TableCell className="text-center border-r border-gray-400">
                {radiasiTotal}
              </TableCell>
              <TableCell className="text-center border-r border-gray-400">
                {kemotrapiTotal}
              </TableCell>
              <TableCell className="text-center border-r border-gray-400">
                {transplantasiTotal}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
