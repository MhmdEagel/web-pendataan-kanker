import { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "./DashboardSidebar/DashboardSidebar";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import { SIDEBAR_ITEMS } from "./DashboardLayout.constants";


interface PropTypes {
  children: ReactNode;
}

export default function DashboardLayout(props: PropTypes) {
  const {children} = props
  
  return (
    <SidebarProvider
      style={
        {
          "--header-height": "calc(var(--spacing) * 16)",
        } as React.CSSProperties
      }
    >
      {/* user={user} */}
    <DashboardSidebar sidebarItems={SIDEBAR_ITEMS} />
      <SidebarInset className="overflow-hidden">
        <div className="flex h-screen flex-col overflow-hidden ">
          <DashboardHeader />
          <main className="flex flex-1 flex-col p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
