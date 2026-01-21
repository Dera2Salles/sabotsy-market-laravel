'use client';

import {
    BarChartIcon,
    CameraIcon,
    ClipboardListIcon,
    DatabaseIcon,
    FileCodeIcon,
    FileIcon,
    FileTextIcon,
    FolderIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon,
} from 'lucide-react';
import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavDocuments } from '../../shad/components/nav-documents';
import { NavMain } from '../../shad/components/nav-main';
import { NavSecondary } from '../../shad/components/nav-secondary';
import { NavUser } from '../../shad/components/nav-user';

const data = {
    user: {
        name: 'shadcn',
        email: 'm@example.com',
        avatar: '/avatars/shadcn.jpg',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '#',
            icon: LayoutDashboardIcon,
        },
        {
            title: 'Lifecycle',
            url: '#',
            icon: ListIcon,
        },
        {
            title: 'Analytics',
            url: '#',
            icon: BarChartIcon,
        },
        {
            title: 'Projects',
            url: '#',
            icon: FolderIcon,
        },
        {
            title: 'Team',
            url: '#',
            icon: UsersIcon,
        },
    ],
    navClouds: [
        {
            title: 'Capture',
            icon: CameraIcon,
            isActive: true,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Proposal',
            icon: FileTextIcon,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
        },
        {
            title: 'Prompts',
            icon: FileCodeIcon,
            url: '#',
            items: [
                {
                    title: 'Active Proposals',
                    url: '#',
                },
                {
                    title: 'Archived',
                    url: '#',
                },
            ],
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
        {
            title: 'Search',
            url: '#',
            icon: SearchIcon,
        },
    ],
    documents: [
        {
            name: 'Data Library',
            url: '#',
            icon: DatabaseIcon,
        },
        {
            name: 'Reports',
            url: '#',
            icon: ClipboardListIcon,
        },
        {
            name: 'Word Assistant',
            url: '#',
            icon: FileIcon,
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
                                <div className="flex flex-row justify-between gap-2">
                                    <div className="flex items-center justify-center text-xl font-semibold text-green-700">
                                        <p className="font-semibold text-yellow-500">
                                            {' '}
                                            Sabotsy
                                        </p>{' '}
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
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
