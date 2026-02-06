"use client";

import { ChartArea, ChevronDown, Table, TableOfContents } from "lucide-react";
import DashboardNavItem from "./DashboardNavItem/DashboardNavItem";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { kabupaten } from "@/components/constants/kabupaten.constant";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { pemeriksaan } from "@/components/constants/pemeriksaan.constant";

export default function DashboardNav() {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();
  const kabupatenParams = searchParams.get("kabupaten");
  const isDetailParams = searchParams.get("isDetail");
  const isDetailSicknessParams = searchParams.get("isDetailSickness");
  const checkupParams = searchParams.get("checkup");

  return (
    <nav className="flex flex-col gap-2 mb-4 print:hidden">
      <div className="sm:inline-flex w-full justify-start items-center p-0">
        <div className="w-fit border-b-[1.5px]">
          <DashboardNavItem
            isActive={
              "/dashboard" == pathname &&
              !isDetailParams &&
              !isDetailSicknessParams
            }
            href={"/dashboard"}
          >
            <ChartArea size={16} />
            <span className="text-sm sm:text-base">Ringkasan</span>
          </DashboardNavItem>
          <DashboardNavItem
            isActive={isDetailParams ? true : false}
            href={"/dashboard?isDetail=true&kabupaten=Pekanbaru"}
          >
            <TableOfContents size={16} />
            <span className="text-sm sm:text-base">Detail</span>
          </DashboardNavItem>
          <DashboardNavItem
            isActive={isDetailSicknessParams ? true : false}
            href={"/dashboard?isDetailSickness=true&checkup=Klinis"}
          >
            <Table size={16} />
            <span className="text-sm sm:text-base">Detail Penyakit</span>
          </DashboardNavItem>
        </div>
        {isDetailParams ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:ml-auto mt-4 sm:mt-0">
              <Button variant={"outline"} className="flex items-center">
                <div>{kabupatenParams ?? "Kabupaten"}</div>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {kabupaten.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => {
                    router.push(
                      `/dashboard?isDetail=true&kabupaten=${item.label}`,
                    );
                  }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        {isDetailSicknessParams ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="sm:ml-auto mt-4 sm:mt-0">
              <Button variant={"outline"} className="flex items-center">
                <div>{checkupParams ?? "Pilih Pemeriksaan"}</div>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {pemeriksaan.map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  onClick={() => {
                    router.push(
                      `/dashboard?isDetailSickness=true&checkup=${item.label}`,
                    );
                  }}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </nav>
  );
}
