"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SidebarItems } from "@/types/Dashboard";
import { User } from "lucide-react";
import { signOut } from "next-auth/react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropTypes {
  sidebarItems?: SidebarItems[];
}

export default function DashboardSidebar(props: PropTypes) {
  const { sidebarItems } = props;
  const pathname = usePathname();
  const url = `/${pathname.split("/").filter(Boolean).slice(0, 2).join("/")}`;

  return (
    <Sidebar>
      <SidebarHeader className="mb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div>
                <Avatar>
                  <AvatarFallback className="bg-slate-300">
                    <User size={15} />
                  </AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">Admin / User</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu> 
            {sidebarItems?.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <div className="font-medium text-[#1C1C1C]/70">
                    {item.title}
                  </div>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem
                        className="cursor-pointer"
                        key={item.key}
                      >
                        <SidebarMenuSubButton
                          isActive={url === item.href}
                          asChild
                        >
                          {item.href ? (
                            <Link href={`${item.href}`}>
                              <span>{item.icon}</span>
                              {item.label}
                            </Link>
                          ) : (
                            <div onClick={() => signOut()}>
                              {item.icon}
                              {item.label}
                            </div>
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="pb-4">
        <Image
          className="block mx-auto"
          src={"/images/logo_izi_2.png"}
          width={100}
          height={100}
          alt="logo Izi"
        />
      </SidebarFooter> */}
    </Sidebar>
  );
}
