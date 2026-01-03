import { MdFlashOn, MdPerson2 } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { useThemeContext } from '@/theme/useThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useIntersection } from '../hooks/useIntersection';
import { Description } from './Description';

import { Link, usePage } from '@inertiajs/react';

// Add declaration for Ziggy's route helper
declare function route(name?: string, params?: any, absolute?: boolean): string;

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
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-white">
                                <span className="text-yellow-400">Sabotsy</span>{' '}
                                Market
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="hidden items-center gap-2 font-semibold text-white md:flex">
                                <MdFlashOn className="text-2xl text-yellow-400" />
                                <p>
                                    Order now and get it within{' '}
                                    <span className="text-yellow-400">
                                        15 min!
                                    </span>
                                </p>
                            </div>

                            {usePage().props.auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button
                                        variant="outline"
                                        className="h-10 rounded-full border-0 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-300"
                                    >
                                         Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={route('login')}>
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="size-10 cursor-pointer rounded-full bg-white text-green-700 transition-all duration-300 hover:bg-gray-100 dark:bg-white"
                                    >
                                        <MdPerson2 className="text-2xl" />
                                    </Button>
                                </Link>
                            )}

                            <button
                                className="cursor-pointer px-5 text-white"
                                onClick={toggleTheme}
                            >
                                {isDark ? <Sun /> : <Moon />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <Description ref={ref} />
        </>
    );
};
