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

const data = {
  user: {
    name: 'Producer User',
    email: 'producer@sabotsymarket.com',
    avatar: '/avatars/producer.jpg',
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

export function ProducerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex font-semibold text-green-700 text-xl justify-center items-center">
                    <p className="text-yellow-500 font-semibold">Sabotsy</p>{' '}
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
