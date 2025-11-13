import { ChartBar, LogOut, Settings, Table } from "lucide-react";

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    items: [
      {
        key: "dashboard-item-1",
        label: "Dashboard",
        href: "/dashboard",
        icon: <ChartBar size={18} />,
      },
      {
        key: "dashboard-item-2",
        label: "Data Pasien",
        href: "/dashboard/data-pasien",
        icon: <Table size={18} />,
      },
      {
        key: "dashboard-item-3",
        label: "Pengaturan",
        href: "/dashboard/pengaturan",
        icon: <Settings size={18} />,
      },
    ],
  },
  {
    title: "Akun",
    items: [
      {
        key: "account-item-3",
        label: "Log Out",
        icon: <LogOut size={18} />,
      },
    ],
  },
];

export { SIDEBAR_ITEMS };
