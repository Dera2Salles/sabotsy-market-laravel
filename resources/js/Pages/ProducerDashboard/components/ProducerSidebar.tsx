import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    BarChart,
    ChevronRight,
    LogOut,
    Package,
    ShoppingCart
} from 'lucide-react';
import { useState } from 'react';

const MENU_ITEMS = [
    {
        title: 'Tableau de bord',
        icon: BarChart,
        href: 'producer.dashboard',
    },
    {
        title: 'Mes Produits',
        icon: Package,
        href: 'producer.productsList',
    },
    {
        title: 'Commandes',
        icon: ShoppingCart,
        href: 'producer.orders',
    },
];

export function ProducerSidebar() {
    const { url, props } = usePage<PageProps>();
    const user = props.auth.user;
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <aside
            className={cn(
                'relative sticky top-0 flex h-screen flex-col border-r border-white/10 bg-zinc-900 transition-all duration-300',
                isCollapsed ? 'w-20' : 'w-72',
            )}
        >
            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-10 z-50 rounded-full border border-white/20 bg-emerald-500 p-1.5 text-white shadow-lg transition-colors hover:bg-emerald-600"
            >
                <ChevronRight
                    className={cn(
                        'h-4 w-4 transition-transform',
                        isCollapsed ? '' : 'rotate-180',
                    )}
                />
            </button>

            {/* Header / Logo */}
            <div
                className={cn(
                    'flex items-center justify-center p-8 pb-12 transition-all border-b border-white/10',
                    isCollapsed ? 'px-4' : 'px-8',
                )}
            >
                {isCollapsed ? (
                    <h1 className="font-bold text-2xl text-white">
                        S
                    </h1>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 ring-1 ring-white/10">
                            <span className="font-bold text-2xl tracking-tight">S</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 leading-none">
                            <span className="font-bold text-xl text-white tracking-tight">Sabotsy</span>
                            <span className="text-[10px] font-bold text-emerald-500 tracking-widest uppercase">Producteur</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-4 py-6">
                {MENU_ITEMS.map((item) => {
                    const isActive = route().current(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={route(item.href)}
                            className={cn(
                                'group relative flex items-center rounded-xl px-4 py-3.5 transition-all duration-300',
                                isActive
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white',
                                isCollapsed
                                    ? 'justify-center'
                                    : 'justify-between',
                            )}
                            title={isCollapsed ? item.title : undefined}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon
                                    className={cn(
                                        'h-5 w-5 flex-shrink-0 transition-colors',
                                        isActive
                                            ? 'text-white'
                                            : 'group-hover:text-emerald-400',
                                    )}
                                />
                                {!isCollapsed && (
                                    <span className="whitespace-nowrap text-sm font-semibold">
                                        {item.title}
                                    </span>
                                )}
                            </div>
                            {!isCollapsed && isActive && (
                                <ChevronRight className="h-4 w-4 text-white" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Profile / Logout */}
            <div
                className={cn(
                    'mt-auto overflow-hidden border-t border-white/10 bg-black/20',
                    isCollapsed ? 'p-4' : 'p-6',
                )}
            >
                {!isCollapsed && (
                    <div className="mb-6 flex items-center gap-3 px-2">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-bold text-emerald-400">
                            {user?.name?.[0]?.toUpperCase() || 'P'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="truncate text-sm font-bold text-white">
                                {user?.name || 'Producer'}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                                {user?.email || 'producer@sabotsy.com'}
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => {
                        router.post(route('logout'));
                    }}
                    className={cn(
                        'group flex w-full items-center gap-3 rounded-xl text-gray-400 transition-all hover:bg-white/5 hover:text-emerald-400',
                        isCollapsed ? 'justify-center p-2' : 'px-4 py-3',
                    )}
                    title="Logout"
                >
                    <LogOut
                        size={18}
                        className="flex-shrink-0 transition-transform group-hover:-translate-x-1"
                    />
                    {!isCollapsed && (
                        <span className="text-sm font-bold">Déconnexion</span>
                    )}
                </button>
            </div>
        </aside>
    );
}
