import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { ReactNode } from "react";

interface ProducerStatCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
    trend?: 'up' | 'down';
    gradient?: 'green' | 'blue' | 'purple' | 'orange';
}

const gradientClasses = {
    green: 'from-green-500/20 to-teal-500/20 border-green-500/30',
    blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
    orange: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
};

const iconBgClasses = {
    green: 'bg-gradient-to-br from-green-500 to-teal-600',
    blue: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    purple: 'bg-gradient-to-br from-purple-500 to-pink-600',
    orange: 'bg-gradient-to-br from-orange-500 to-amber-600',
};

export const ProducerStatCard = ({ 
    title, 
    value, 
    icon, 
    description, 
    trend = 'up',
    gradient = 'green' 
}: ProducerStatCardProps) => {
    return (
        <Card className={`
            group relative overflow-hidden border-2 
            bg-gradient-to-br ${gradientClasses[gradient]}
            backdrop-blur-xl transition-all duration-300 
            hover:scale-105 hover:shadow-2xl hover:shadow-${gradient}-500/20
            animate-slide-up
        `}>
            {/* Gradient top border */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${iconBgClasses[gradient]}`} />
            
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {title}
                </CardTitle>
                <div className={`
                    p-2 rounded-xl ${iconBgClasses[gradient]} 
                    shadow-lg transform transition-transform duration-300 
                    group-hover:scale-110 group-hover:rotate-6
                `}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="relative z-10">
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {value}
                </div>
                {description && (
                    <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className={`h-3 w-3 ${trend === 'up' ? 'text-green-500' : 'text-red-500 rotate-180'}`} />
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
