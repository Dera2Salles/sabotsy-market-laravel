import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

interface ProducerStatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
    trend?: 'up' | 'down';
    variant?: 'green' | 'blue' | 'purple' | 'orange';
}

const variantStyles = {
    green: {
        gradient: 'from-green-500/10 to-emerald-500/10 border-green-500/20',
        iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
        iconShadow: 'shadow-green-500/20',
        text: 'text-green-700 dark:text-green-400',
    },
    blue: {
        gradient: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20',
        iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
        iconShadow: 'shadow-blue-500/20',
        text: 'text-blue-700 dark:text-blue-400',
    },
    purple: {
        gradient: 'from-purple-500/10 to-pink-500/10 border-purple-500/20',
        iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
        iconShadow: 'shadow-purple-500/20',
        text: 'text-purple-700 dark:text-purple-400',
    },
    orange: {
        gradient: 'from-orange-500/10 to-amber-500/10 border-orange-500/20',
        iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
        iconShadow: 'shadow-orange-500/20',
        text: 'text-orange-700 dark:text-orange-400',
    },
};

export const ProducerStatCard = ({ 
    title, 
    value, 
    icon, 
    description, 
    trend = 'up',
    variant = 'green' 
}: ProducerStatCardProps) => {
    const styles = variantStyles[variant];

    return (
        <Card className="group relative overflow-hidden border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900/50 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {title}
                </CardTitle>
                <div className={`p-2 rounded-xl ${styles.iconBg} bg-opacity-10 dark:bg-opacity-20 transition-transform group-hover:scale-110`}>
                     <div className={styles.text}>{icon}</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                    {value}
                </div>
                {description && (
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`
                            flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full
                            ${trend === 'up' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'}
                        `}>
                            {trend === 'up' ? '+' : ''}15%
                            <TrendingUp className={`h-3 w-3 ml-1 ${trend === 'up' ? '' : 'rotate-180'}`} />
                        </span>
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                            {description}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
