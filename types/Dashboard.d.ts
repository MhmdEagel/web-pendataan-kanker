import { JSX } from "react";

interface SidebarItems {
  title: string;
  items: SidebarItem[]
}

interface SidebarItem {
  key: string;
  label: string;
  href?: string;
  icon: JSX.Element
}

export type {SidebarItems};