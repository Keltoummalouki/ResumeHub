import { Link } from 'react-router-dom';
import {
    FileText,
    Briefcase,
    FolderKanban,
    Wrench,
    Download,
    Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatsCard from '@/components/dashboard/StatsCard';
import CompletionMeter from '@/components/dashboard/CompletionMeter';
import QuickActions from '@/components/dashboard/QuickActions';
import { useProfile, useCareerStats, useCVVariants, useActivityLog } from '@/db/hooks';
import { Suspense } from 'react';

const DashboardContent = () => {
    const { profile } = useProfile();
    const stats = useCareerStats();
    const { variants } = useCVVariants();
    const { activities } = useActivityLog(5);

    if (!profile || !stats) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const formatTime = (date: Date) => {
        const now = new Date();
        const diff = now.getTime() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        return 'Just now';
    };

    const getActivityIcon = (entityType: string) => {
        switch (entityType) {
            case 'experience':
                return Briefcase;
            case 'project':
                return FolderKanban;
            case 'skill':
                return Wrench;
            case 'cvVariant':
                return FileText;
            default:
                return Download;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground mt-1">
                        Welcome back, {profile.name.split(' ')[0]}! Here's your career overview.
                    </p>
                </div>
                <Button asChild>
                    <Link to="/dashboard/cvs">
                        <Plus className="h-4 w-4 mr-2" />
                        New CV
                    </Link>
                </Button>
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Profile Completion"
                    value={`${stats.profileComplete}%`}
                    icon={<CompletionMeter percentage={stats.profileComplete} size="sm" showLabel={false} />}
                    description={stats.profileComplete >= 80 ? 'Great job!' : 'Keep adding details'}
                />
                <StatsCard
                    title="Experience"
                    value={stats.experienceCount}
                    icon={<Briefcase className="h-6 w-6" />}
                    description={`${stats.experienceCount} position${stats.experienceCount !== 1 ? 's' : ''}`}
                />
                <StatsCard
                    title="Projects"
                    value={stats.projectCount}
                    icon={<FolderKanban className="h-6 w-6" />}
                    description={`${stats.projectCount} project${stats.projectCount !== 1 ? 's' : ''}`}
                />
                <StatsCard
                    title="Skills"
                    value={stats.skillCount}
                    icon={<Wrench className="h-6 w-6" />}
                    description="Languages, frameworks & tools"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Completion Details */}
                <div className="lg:col-span-1 bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-4">Profile Progress</h3>
                    <div className="flex justify-center mb-6">
                        <CompletionMeter percentage={stats.profileComplete} size="lg" />
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: 'Personal Info', complete: !!profile.name, href: '/dashboard/profile' },
                            { label: 'Experience', complete: stats.experienceCount > 0, href: '/dashboard/experience' },
                            { label: 'Projects', complete: stats.projectCount > 0, href: '/dashboard/projects' },
                            { label: 'Skills', complete: stats.skillCount > 0, href: '/dashboard/skills' },
                            { label: 'Education', complete: stats.educationCount > 0, href: '/dashboard/education' },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                            >
                                <span className="text-sm">{item.label}</span>
                                <span
                                    className={`w-2 h-2 rounded-full ${item.complete ? 'bg-green-500' : 'bg-muted-foreground/30'
                                        }`}
                                />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* CV Variants List */}
                <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Your CVs ({stats.cvVariantCount})</h3>
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/dashboard/cvs">View all</Link>
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {variants?.slice(0, 3).map((cv) => (
                            <div
                                key={cv.id}
                                className="flex items-center justify-between p-4 bg-accent/50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <FileText className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-sm">{cv.name}</h4>
                                        <p className="text-xs text-muted-foreground">
                                            {cv.template} • {cv.language.toUpperCase()}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link to={`/preview/${cv.id}`}>Preview</Link>
                                </Button>
                            </div>
                        ))}
                        {(!variants || variants.length === 0) && (
                            <div className="text-center py-8 text-muted-foreground">
                                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No CVs yet</p>
                                <Button asChild size="sm" className="mt-2">
                                    <Link to="/dashboard/cvs">Create your first CV</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {activities && activities.length > 0 ? (
                        activities.map((activity) => {
                            const Icon = getActivityIcon(activity.entityType);
                            return (
                                <div key={activity.id} className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatTime(activity.timestamp)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-4">
                            No recent activity
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
};

export default Dashboard;
