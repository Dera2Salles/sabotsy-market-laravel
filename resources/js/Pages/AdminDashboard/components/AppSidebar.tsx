'use client';

import {
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  HelpCircleIcon,
  SettingsIcon
} from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'Admin User',
    email: 'admin@sabotsymarket.com',
    avatar: '/avatars/admin.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: BarChartIcon,
    },
    {
      title: 'User Management',
      url: '/admin/users',
      icon: DatabaseIcon,
    },
    {
      title: 'Producer Management',
      url: '/admin/producers',
      icon: ClipboardListIcon,
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: SettingsIcon,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: HelpCircleIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <div className=" flex flex-row justify-between gap-2">
                  <div className="flex font-semibold text-green-700 text-xl justify-center items-center">
                    <p className=" text-yellow-500 font-semibold"> Sabotsy</p>{' '}
                    Market
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
