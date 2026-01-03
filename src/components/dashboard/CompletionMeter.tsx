import { cn } from '@/lib/utils';

interface CompletionMeterProps {
    percentage: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
}

const CompletionMeter = ({
    percentage,
    size = 'md',
    showLabel = true,
    className,
}: CompletionMeterProps) => {
    const sizes = {
        sm: { width: 80, stroke: 6 },
        md: { width: 120, stroke: 8 },
        lg: { width: 160, stroke: 10 },
    };

    const { width, stroke } = sizes[size];
    const radius = (width - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    const getColor = () => {
        if (percentage >= 80) return 'text-green-500';
        if (percentage >= 50) return 'text-yellow-500';
        return 'text-red-500';
    };

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={width} height={width} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    className="text-muted/30"
                />
                {/* Progress circle */}
                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={stroke}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    className={cn('transition-all duration-500', getColor())}
                />
            </svg>
            {showLabel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold">{percentage}%</span>
                    <span className="text-xs text-muted-foreground">Complete</span>
                </div>
            )}
        </div>
    );
};

export default CompletionMeter;
