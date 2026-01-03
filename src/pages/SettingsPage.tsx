import { Moon, Sun, Monitor, Globe, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/cvStore';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const SettingsPage = () => {
    const { settings, updateSettings } = useCVStore();
    const { i18n } = useTranslation();

    const themes = [
        { value: 'light', label: 'Light', icon: Sun },
        { value: 'dark', label: 'Dark', icon: Moon },
        { value: 'system', label: 'System', icon: Monitor },
    ] as const;

    const languages = [
        { value: 'fr', label: 'Français', flag: '🇫🇷' },
        { value: 'en', label: 'English', flag: '🇬🇧' },
        { value: 'ar', label: 'العربية', flag: '🇸🇦' },
    ] as const;

    const templates = [
        { value: 'classic', label: 'Classic', description: 'Traditional single-column layout' },
        { value: 'modern', label: 'Modern', description: 'Two-column with sidebar' },
        { value: 'minimal', label: 'Minimal', description: 'Clean, whitespace-focused' },
    ] as const;

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        updateSettings({ themeMode: theme });
        document.documentElement.classList.remove('light', 'dark');
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            document.documentElement.classList.add(systemTheme);
        } else {
            document.documentElement.classList.add(theme);
        }
    };

    const handleLanguageChange = (lang: 'fr' | 'en' | 'ar') => {
        i18n.changeLanguage(lang);
        updateSettings({ language: lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    return (
        <div className="max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground mt-1">
                    Customize your ResumeHub experience
                </p>
            </div>

            {/* Theme */}
            <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Appearance</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium mb-2 block">Theme</label>
                        <div className="flex gap-2">
                            {themes.map((theme) => (
                                <Button
                                    key={theme.value}
                                    variant={settings.themeMode === theme.value ? 'default' : 'outline'}
                                    onClick={() => handleThemeChange(theme.value)}
                                    className="flex-1"
                                >
                                    <theme.icon className="h-4 w-4 mr-2" />
                                    {theme.label}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">Show Profile Photo</label>
                        <div className="flex gap-2">
                            <Button
                                variant={settings.showPhoto ? 'default' : 'outline'}
                                onClick={() => updateSettings({ showPhoto: true })}
                            >
                                Show
                            </Button>
                            <Button
                                variant={!settings.showPhoto ? 'default' : 'outline'}
                                onClick={() => updateSettings({ showPhoto: false })}
                            >
                                Hide
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Language */}
            <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Globe className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Language</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {languages.map((lang) => (
                        <Button
                            key={lang.value}
                            variant={settings.language === lang.value ? 'default' : 'outline'}
                            onClick={() => handleLanguageChange(lang.value)}
                            className="flex items-center gap-2"
                        >
                            <span>{lang.flag}</span>
                            {lang.label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Default Template */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Default Template</h3>
                <div className="space-y-2">
                    {templates.map((template) => (
                        <button
                            key={template.value}
                            onClick={() => updateSettings({ templateId: template.value })}
                            className={cn(
                                'w-full flex items-center justify-between p-4 rounded-lg border transition-all',
                                settings.templateId === template.value
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/50'
                            )}
                        >
                            <div className="text-left">
                                <div className="font-medium">{template.label}</div>
                                <div className="text-sm text-muted-foreground">{template.description}</div>
                            </div>
                            {settings.templateId === template.value && (
                                <div className="w-3 h-3 rounded-full bg-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Data Management */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Data Management</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                        <div>
                            <div className="font-medium">Export All Data</div>
                            <div className="text-sm text-muted-foreground">
                                Download your career data as JSON
                            </div>
                        </div>
                        <Button variant="outline">Export</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                        <div>
                            <div className="font-medium">Import Data</div>
                            <div className="text-sm text-muted-foreground">
                                Restore from a backup file
                            </div>
                        </div>
                        <Button variant="outline">Import</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
                        <div>
                            <div className="font-medium text-destructive">Reset All Data</div>
                            <div className="text-sm text-muted-foreground">
                                Delete all data and start fresh
                            </div>
                        </div>
                        <Button variant="destructive">Reset</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
