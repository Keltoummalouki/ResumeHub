import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Command,
    Home,
    User,
    Briefcase,
    FolderKanban,
    GraduationCap,
    Wrench,
    FileText,
    Eye,
    Share2,
    Sparkles,
    Settings,
    X,
    Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandItem {
    id: string;
    title: string;
    description?: string;
    icon: React.ElementType;
    action: () => void;
    keywords?: string[];
    shortcut?: string;
}

const CommandPalette = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const commands: CommandItem[] = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            description: 'Go to dashboard overview',
            icon: Home,
            action: () => navigate('/dashboard'),
            keywords: ['home', 'main'],
            shortcut: 'Ctrl+D',
        },
        {
            id: 'preview',
            title: 'Preview CV',
            description: 'Preview your CV',
            icon: Eye,
            action: () => navigate('/preview'),
            keywords: ['view', 'see'],
            shortcut: 'Ctrl+P',
        },
        {
            id: 'share',
            title: 'Share & Export',
            description: 'Share link or export PDF',
            icon: Share2,
            action: () => navigate('/share'),
            keywords: ['download', 'pdf', 'link'],
            shortcut: 'Ctrl+Shift+S',
        },
        {
            id: 'analyze',
            title: 'CV Analyzer',
            description: 'Get CV suggestions',
            icon: Sparkles,
            action: () => navigate('/dashboard/analyze'),
            keywords: ['ai', 'suggestions', 'improve'],
            shortcut: 'Ctrl+A',
        },
        {
            id: 'profile',
            title: 'Edit Profile',
            description: 'Update personal info',
            icon: User,
            action: () => navigate('/dashboard/profile'),
            keywords: ['name', 'contact', 'photo'],
        },
        {
            id: 'experience',
            title: 'Edit Experience',
            description: 'Manage work experience',
            icon: Briefcase,
            action: () => navigate('/dashboard/experience'),
            keywords: ['work', 'job', 'internship'],
        },
        {
            id: 'projects',
            title: 'Edit Projects',
            description: 'Manage portfolio projects',
            icon: FolderKanban,
            action: () => navigate('/dashboard/projects'),
            keywords: ['portfolio', 'apps'],
        },
        {
            id: 'skills',
            title: 'Edit Skills',
            description: 'Manage technical skills',
            icon: Wrench,
            action: () => navigate('/dashboard/skills'),
            keywords: ['tech', 'languages', 'tools'],
        },
        {
            id: 'education',
            title: 'Edit Education',
            description: 'Manage education history',
            icon: GraduationCap,
            action: () => navigate('/dashboard/education'),
            keywords: ['degree', 'university', 'school'],
        },
        {
            id: 'cvs',
            title: 'My CVs',
            description: 'Manage CV variants',
            icon: FileText,
            action: () => navigate('/dashboard/cvs'),
            keywords: ['variants', 'templates'],
            shortcut: 'Ctrl+N',
        },
        {
            id: 'settings',
            title: 'Settings',
            description: 'App preferences',
            icon: Settings,
            action: () => navigate('/dashboard/settings'),
            keywords: ['theme', 'language', 'preferences'],
        },
    ];

    const filteredCommands = commands.filter(cmd => {
        const searchLower = search.toLowerCase();
        return (
            cmd.title.toLowerCase().includes(searchLower) ||
            cmd.description?.toLowerCase().includes(searchLower) ||
            cmd.keywords?.some(k => k.includes(searchLower))
        );
    });

    // Handle keyboard shortcut to open
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Handle navigation within palette
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
            setSearch('');
        }
    }, [filteredCommands, selectedIndex]);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-xl z-50">
                <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a command or search..."
                            className="flex-1 bg-transparent outline-none text-sm"
                            autoFocus
                        />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 hover:bg-accent rounded"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Commands List */}
                    <div className="max-h-80 overflow-y-auto py-2">
                        {filteredCommands.length === 0 ? (
                            <div className="px-4 py-8 text-center text-muted-foreground text-sm">
                                No results found
                            </div>
                        ) : (
                            filteredCommands.map((cmd, index) => (
                                <button
                                    key={cmd.id}
                                    onClick={() => {
                                        cmd.action();
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                    className={cn(
                                        'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors',
                                        index === selectedIndex ? 'bg-accent' : 'hover:bg-accent/50'
                                    )}
                                >
                                    <cmd.icon className="h-5 w-5 text-muted-foreground" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium">{cmd.title}</div>
                                        {cmd.description && (
                                            <div className="text-xs text-muted-foreground truncate">
                                                {cmd.description}
                                            </div>
                                        )}
                                    </div>
                                    {cmd.shortcut && (
                                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                                            {cmd.shortcut}
                                        </span>
                                    )}
                                </button>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd> Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-muted rounded">↵</kbd> Select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 bg-muted rounded">esc</kbd> Close
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommandPalette;
