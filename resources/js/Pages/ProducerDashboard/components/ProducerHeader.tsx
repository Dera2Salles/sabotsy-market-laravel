import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function ProducerHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-15 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-green-700 hover:text-green-700" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Producer Portal
          </h2>
        </div>
      </div>
    </header>
  );
}
