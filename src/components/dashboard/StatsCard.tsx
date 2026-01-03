import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: ReactNode;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

const StatsCard = ({ title, value, icon, description, trend, className }: StatsCardProps) => {
    return (
        <div
            className={cn(
                'bg-card rounded-xl border border-border p-6 transition-all duration-200 hover:shadow-lg hover:border-primary/20',
                className
            )}
        >
            <div className="flex items-start justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold tracking-tight">{value}</p>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                    {trend && (
                        <p
                            className={cn(
                                'text-sm font-medium',
                                trend.isPositive ? 'text-green-500' : 'text-red-500'
                            )}
                        >
                            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                        </p>
                    )}
                </div>
                <div className="p-3 bg-primary/10 rounded-lg text-primary">{icon}</div>
            </div>
        </div>
    );
};

export default StatsCard;
