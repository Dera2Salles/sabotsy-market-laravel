import { MdFlashOn, MdPerson2 } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/theme/useThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { Description } from './Description';

import { Link, usePage } from '@inertiajs/react';

// Add declaration for Ziggy's route helper

export const NavBar = () => {
    const { ref, isVisible } = useIntersection();
    const { toggleTheme, isDark } = useThemeContext();

    return (
        <>
            <header
                className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
                    isVisible
                        ? 'bg-gradient-to-r from-green-700 to-green-600 shadow-lg'
                        : 'bg-transparent'
                }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between py-3 md:py-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-white md:text-2xl">
                                <span className="text-yellow-400">Sabotsy</span>{' '}
                                <span className="hidden sm:inline">Market</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="flex items-center gap-1 font-semibold text-white md:gap-2">
                                <MdFlashOn className="text-xl text-yellow-400 md:text-2xl" />
                                <p className="text-xs md:text-base">
                                    <span className="hidden lg:inline">Commandez maintenant et recevez-le en{' '}</span>
                                    <span className="text-yellow-400">15 min !</span>
                                </p>
                            </div>

                            {(usePage().props as any).auth?.user &&
                            (usePage().props as any).auth?.user.role !=
                                'customer' ? (
                                <Link href={route('dashboard')}>
                                    <Button
                                        variant="outline"
                                        className="h-10 rounded-full border-0 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                                    >
                                        Tableau de bord
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="size-9 cursor-pointer rounded-full bg-white text-green-700 transition-all duration-300 hover:bg-gray-100 dark:bg-white md:size-10"
                                    >
                                        <MdPerson2 className="text-xl md:text-2xl" />
                                    </Button>
                                </Link>
                            )}

                            <button
                                className="cursor-pointer px-2 text-white md:px-5"
                                onClick={toggleTheme}
                            >
                                {isDark ? <Sun size={20} className="md:size-6" /> : <Moon size={20} className="md:size-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Description ref={ref} />
        </>
    );
};
