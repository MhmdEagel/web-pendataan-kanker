"use client";

import { usePathname } from "next/navigation";
import { DASHBOARD_TITLE } from "./DashboardTitle.constant";


export default function DashboardTitle() {
  const pathName = usePathname();
  const dashboard_title = DASHBOARD_TITLE.find((item) => pathName === item.path);
  return <h1 className="font-bold text-lg text-white">{dashboard_title?.title}</h1>;
}
