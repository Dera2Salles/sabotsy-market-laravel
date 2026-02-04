export function ProducerHeader() {
  return (
    <header className="sticky top-0 z-40 w-full flex h-16 shrink-0 items-center gap-2 border-b border-zinc-100 transition-[width,height] ease-linear bg-white/80 backdrop-blur-md dark:border-zinc-800/50 dark:bg-zinc-900/80">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex-1">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Producer Portal
          </h2>
        </div>
      </div>
    </header>
  );
}
