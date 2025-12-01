"use client";

import { usePathname } from "next/navigation";
import { ChartArea, TableOfContents } from "lucide-react";
import DashboardNavItem from "./DashboardNavItem/DashboardNavItem";
import { useState } from "react";

export default function DashboardNav() {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState("ringkasan");

  return (
    <nav className="flex flex-col gap-2 mb-4 w-fit">
      <div className="inline-flex w-full justify-center items-center p-0">
        <div className="w-full border-b-[1.5px]">
          <DashboardNavItem
            isActive={"ringkasan" == activeNav}
            setIsActive={setActiveNav}
            href={"ringkasan"}
          >
            <ChartArea size={16} />
            <span>Ringkasan</span>
          </DashboardNavItem>
          <DashboardNavItem
            setIsActive={setActiveNav}
            isActive={"detail" == activeNav}
            href={"detail"}
          >
            <TableOfContents size={16} />
            <span>Detail</span>
          </DashboardNavItem>
        </div>
      </div>
    </nav>
  );
}
