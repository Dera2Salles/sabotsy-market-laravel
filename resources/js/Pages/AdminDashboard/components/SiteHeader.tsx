import { NavBar } from './NavBar';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <NavBar />
      </div>
    </header>
  );
}
