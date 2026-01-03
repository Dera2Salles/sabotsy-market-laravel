'use client';

import {
  BarChart3,
  HelpCircle,
  Package,
  Settings,
  ShoppingCart,
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

import { usePage } from '@inertiajs/react';

export function ProducerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { auth } = usePage().props as any;
  const user = auth.user;

  const sidebarData = {
    user: {
      name: user?.name || 'Producer User',
      email: user?.email || 'producer@sabotsymarket.com',
      avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Producer'}`,
    },
    navMain: [
      {
        title: 'Dashboard',
        url: '/producer/dashboard',
        icon: BarChart3,
      },
      {
        title: 'My Products',
        url: '/producer/products',
        icon: Package,
      },
      {
        title: 'Orders',
        url: '/producer/orders',
        icon: ShoppingCart,
      },
    ],
    navSecondary: [
      {
        title: 'Settings',
        url: '#',
        icon: Settings,
      },
      {
        title: 'Get Help',
        url: '#',
        icon: HelpCircle,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pb-4 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors rounded-xl group-data-[collapsible=icon]:!p-2"
            >
              <a href="#">
                <div className="flex flex-row items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-600 to-teal-600 text-white shadow-lg shadow-green-500/20">
                    <span className="font-bold text-lg">S</span>
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                     <span className="font-bold text-lg text-emerald-950 dark:text-emerald-50">Sabotsy</span>
                     <span className="text-xs font-medium text-amber-500 tracking-wider uppercase">Producer</span>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-50 dark:border-zinc-800/50">
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
