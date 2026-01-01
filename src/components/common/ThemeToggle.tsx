import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCVStore } from '@/store/cvStore';
import { ThemeMode } from '@/types/cv';
import { useEffect } from 'react';

const ThemeToggle = () => {
    const { themeMode } = useCVStore((state) => state.settings);
    const setTheme = useCVStore((state) => state.setTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (themeMode === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(themeMode);
        }
    }, [themeMode]);

    const handleThemeChange = (theme: ThemeMode) => {
        setTheme(theme);
    };

    const getIcon = () => {
        switch (themeMode) {
            case 'dark':
                return <Moon className="h-4 w-4" />;
            case 'light':
                return <Sun className="h-4 w-4" />;
            default:
                return <Monitor className="h-4 w-4" />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                    {getIcon()}
                    <span className="sr-only">Changer le thème</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Clair</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Sombre</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('system')}>
                    <Monitor className="mr-2 h-4 w-4" />
                    <span>Système</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
