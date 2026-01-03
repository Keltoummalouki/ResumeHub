import { Link } from 'react-router-dom';
import { Plus, Download, Eye, Sparkles, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
    const actions = [
        {
            label: 'Create New CV',
            description: 'Start a new CV variant',
            icon: Plus,
            href: '/dashboard/cvs',
            variant: 'default' as const,
        },
        {
            label: 'Preview CV',
            description: 'See how it looks',
            icon: Eye,
            href: '/preview',
            variant: 'outline' as const,
        },
        {
            label: 'Share & Export',
            description: 'Share link or PDF',
            icon: Share2,
            href: '/share',
            variant: 'outline' as const,
        },
        {
            label: 'AI Suggestions',
            description: 'Improve your CV',
            icon: Sparkles,
            href: '/dashboard/analyze',
            variant: 'outline' as const,
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {actions.map((action) => (
                <Button
                    key={action.label}
                    variant={action.variant}
                    asChild
                    className="h-auto flex-col items-start p-4 gap-2"
                >
                    <Link to={action.href}>
                        <div className="flex items-center gap-2 w-full">
                            <action.icon className="h-5 w-5" />
                            <span className="font-medium">{action.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-normal">
                            {action.description}
                        </span>
                    </Link>
                </Button>
            ))}
        </div>
    );
};

export default QuickActions;
