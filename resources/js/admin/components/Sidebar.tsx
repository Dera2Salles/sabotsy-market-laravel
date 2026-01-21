'use client';

import Logo from '@/assets/logo.png';
import { cn } from '@/lib/utils';
import { AuthService } from '@/services/auth.service';
import {
    ChevronRight,
    Eye,
    FileText,
    LayoutDashboard,
    LogOut,
    User
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const MENU_ITEMS = [
  {
    title: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/admin/dashboard',
  },
  {
    title: 'Éditeur de Blog',
    icon: FileText,
    href: '/admin/blog-editor',
  },
  {
    title: 'Mes Informations',
    icon: User,
    href: '/admin/profile',
  },
  {
    title: 'Aperçu des Posts',
    icon: Eye,
    href: '/admin/posts-preview',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = AuthService.getUser();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={cn(
        "bg-brand-primary-navy border-r border-white/10 flex flex-col h-screen sticky top-0 transition-all duration-300 relative",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-brand-primary border border-white/20 text-white p-1.5 rounded-full shadow-lg hover:bg-brand-primary-light transition-colors z-50"
      >
        <ChevronRight className={cn("h-4 w-4 transition-transform", isCollapsed ? "" : "rotate-180")} />
      </button>

      {/* Header / Logo */}
      <div className={cn("p-8 pb-12 flex items-center justify-center transition-all", isCollapsed ? "px-4" : "px-8")}>
        {isCollapsed ? (
           <h1 className="text-xl font-bold text-white font-serif">A</h1>
        ) : (
           <Image src={Logo} alt="Ariel Logo" width={120} height={40} className="h-10 w-auto" />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative",
                isActive 
                  ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white",
                isCollapsed ? "justify-center" : "justify-between"
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn(
                  "h-5 w-5 transition-colors flex-shrink-0",
                  isActive ? "text-brand-gold" : "group-hover:text-brand-gold"
                )} />
                {!isCollapsed && <span className="font-semibold text-sm whitespace-nowrap">{item.title}</span>}
              </div>
              {!isCollapsed && isActive && <ChevronRight className="h-4 w-4 text-brand-gold" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Profile / Logout */}
      <div className={cn("mt-auto border-t border-white/10 bg-black/20 overflow-hidden", isCollapsed ? "p-4" : "p-6")}>
        {!isCollapsed && (
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="h-10 w-10 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user?.name || 'Administrateur'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'admin@ariel.com'}</p>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => {
            AuthService.logout();
            window.location.href = '/admin/login';
          }}
          className={cn(
            "w-full flex items-center gap-3 text-gray-400 hover:text-brand-gold hover:bg-white/5 rounded-xl transition-all group",
            isCollapsed ? "justify-center p-2" : "px-4 py-3"
          )}
          title="Déconnexion"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-bold">Déconnexion</span>}
        </button>
      </div>
    </aside>
  );
}
