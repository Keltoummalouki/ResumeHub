import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCVStore } from '@/store/cvStore';

const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();
    const { settings, updateSettings } = useCVStore();

    const currentLanguage = languages.find((l) => l.code === i18n.language) || languages[0];

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        updateSettings({ language: langCode as 'fr' | 'en' | 'ar' });

        // Update document direction for RTL languages
        if (langCode === 'ar') {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
        } else {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = langCode;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="gap-1">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={i18n.language === lang.code ? 'bg-accent' : ''}
                    >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
