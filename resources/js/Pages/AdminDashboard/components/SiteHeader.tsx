import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { NavBar } from './NavBar';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-green-700 hover:text-green-700" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <NavBar />
      </div>
    </header>
  );
}
