import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
    trend?: 'up' | 'down';
    variant?: 'emerald' | 'amber' | 'teal' | 'blue';
}

const variantStyles = {
    emerald: {
        gradient: 'from-emerald-500/10 to-green-500/10 border-emerald-500/20',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
        iconShadow: 'shadow-emerald-500/20',
        text: 'text-emerald-700 dark:text-emerald-400',
    },
    amber: {
        gradient: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20',
        iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600',
        iconShadow: 'shadow-amber-500/20',
        text: 'text-amber-700 dark:text-amber-400',
    },
    teal: {
        gradient: 'from-teal-500/10 to-cyan-500/10 border-teal-500/20',
        iconBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
        iconShadow: 'shadow-teal-500/20',
        text: 'text-teal-700 dark:text-teal-400',
    },
    blue: {
        gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        iconShadow: 'shadow-blue-500/20',
        text: 'text-blue-700 dark:text-blue-400',
    },
};

export const StatCard = ({ 
    title, 
    value, 
    icon, 
    description, 
    trend = 'up',
    variant = 'emerald' 
}: StatCardProps) => {
    const styles = variantStyles[variant];

    return (
        <Card className={`
            group relative overflow-hidden border
            bg-gradient-to-br ${styles.gradient}
            backdrop-blur-xl transition-all duration-300 
            hover:-translate-y-1 hover:shadow-xl ${styles.iconShadow}
            animate-slide-up
        `}>
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-white/40 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                    {title}
                </CardTitle>
                <div className={`
                    p-2.5 rounded-xl ${styles.iconBg} 
                    shadow-lg transform transition-all duration-300 
                    group-hover:scale-110 group-hover:rotate-3
                `}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
                <div className={`text-3xl font-bold ${styles.text} mb-1`}>
                    {value}
                </div>
                {description && (
                    <div className="flex items-center gap-2">
                        <span className={`
                            flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full
                            ${trend === 'up' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}
                        `}>
                            {trend === 'up' ? '+' : ''}25%
                            <TrendingUp className={`h-3 w-3 ml-1 ${trend === 'up' ? '' : 'rotate-180'}`} />
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
