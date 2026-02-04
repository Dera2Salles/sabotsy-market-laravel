import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight, type LucideIcon } from 'lucide-react';

import { Link } from '@inertiajs/react';

export function NavMain({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon?: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase mb-4 px-2">Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    className="data-[state=open]:bg-emerald-500/10 data-[state=open]:text-emerald-400 hover:bg-white/5 hover:text-white transition-all duration-300 rounded-lg py-5 px-3 mb-1"
                                >
                                  <Link href={item.url} className="flex items-center gap-3">
                                    {item.icon && <item.icon className="h-4 w-4 opacity-80 group-hover:opacity-100 transition-opacity" />}
                                    <span className="font-medium text-sm tracking-wide">{item.title}</span>
                                    {item.items && (
                                        <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90 opacity-50" />
                                    )}
                                  </Link>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            {item.items && (
                                <CollapsibleContent>
                                    <SidebarMenuSub className="border-l-white/10 ml-5 pl-3">
                                        {item.items.map((subItem) => (
                                            <SidebarMenuSubItem
                                                key={subItem.title}
                                            >
                                                <SidebarMenuSubButton asChild className="hover:bg-white/5 hover:text-emerald-400 text-zinc-400">
                                                    <Link href={subItem.url}>
                                                        <span>
                                                            {subItem.title}
                                                        </span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            )}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
