"use client";

import { ChartArea, ChevronDown, TableOfContents } from "lucide-react";
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

export default function DashboardNav() {
  const pathname = usePathname();

  const router = useRouter();
  const searchParams = useSearchParams();
  const kabupatenParams = searchParams.get("kabupaten");
  const isDetailParams = searchParams.get("isDetail");
  const path = `${pathname}${isDetailParams ? `?isDetail=${isDetailParams}` : ""}`;
  console.log(path)
  return (
    <nav className="flex flex-col gap-2 mb-4">
      <div className="inline-flex w-full justify-start items-center p-0">
        <div className="w-fit border-b-[1.5px]">
          <DashboardNavItem isActive={"/dashboard" == path} href={"/dashboard"}>
            <ChartArea size={16} />
            <span>Ringkasan</span>
          </DashboardNavItem>
          <DashboardNavItem
            isActive={"/dashboard?isDetail=true" == path}
            href={"/dashboard?isDetail=true&kabupaten=Pekanbaru"}
          >
            <TableOfContents size={16} />
            <span>Detail</span>
          </DashboardNavItem>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="ml-auto">
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
                    `/dashboard?isDetail=true&kabupaten=${item.label}`
                  );
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
