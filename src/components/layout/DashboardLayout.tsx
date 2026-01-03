import { NavLink, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
    LayoutDashboard,
    User,
    Briefcase,
    FolderKanban,
    GraduationCap,
    Wrench,
    Settings,
    FileText,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import ThemeToggle from '@/components/common/ThemeToggle';
import LanguageSelector from '@/components/common/LanguageSelector';

const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { path: '/dashboard/profile', icon: User, label: 'Profile' },
    { path: '/dashboard/experience', icon: Briefcase, label: 'Experience' },
    { path: '/dashboard/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/dashboard/skills', icon: Wrench, label: 'Skills' },
    { path: '/dashboard/education', icon: GraduationCap, label: 'Education' },
    { path: '/dashboard/cvs', icon: FileText, label: 'My CVs' },
    { path: '/dashboard/analyze', icon: Sparkles, label: 'Analyze' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

const DashboardLayout = () => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen flex bg-background">
            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 h-full bg-card border-r border-border transition-all duration-300 z-40 flex flex-col',
                    collapsed ? 'w-16' : 'w-64'
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <FileText className="h-6 w-6 text-primary" />
                            <span className="text-lg font-bold">
                                Resume<span className="text-primary">Hub</span>
                            </span>
                        </div>
                    )}
                    {collapsed && <FileText className="h-6 w-6 text-primary mx-auto" />}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-md hover:bg-accent transition-colors"
                    >
                        {collapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 overflow-y-auto">
                    <ul className="space-y-1 px-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.end}
                                    className={({ isActive }) =>
                                        cn(
                                            'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                                            'hover:bg-accent hover:text-accent-foreground',
                                            isActive
                                                ? 'bg-primary text-primary-foreground font-medium'
                                                : 'text-muted-foreground'
                                        )
                                    }
                                >
                                    <item.icon className="h-5 w-5 flex-shrink-0" />
                                    {!collapsed && <span className="truncate">{item.label}</span>}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border">
                    <div className={cn('flex items-center', collapsed ? 'justify-center' : 'gap-2')}>
                        <LanguageSelector />
                        <ThemeToggle />
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={cn(
                    'flex-1 transition-all duration-300',
                    collapsed ? 'ml-16' : 'ml-64'
                )}
            >
                <div className="min-h-screen p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
