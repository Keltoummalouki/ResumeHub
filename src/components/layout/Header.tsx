import ThemeToggle from '@/components/common/ThemeToggle';
import TemplateSelector from '@/components/common/TemplateSelector';
import ExportMenu from '@/components/common/ExportMenu';
import LanguageSelector from '@/components/common/LanguageSelector';
import { FileText } from 'lucide-react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print:hidden">
            <div className="container flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    <h1 className="text-lg font-bold tracking-tight">
                        Resume<span className="text-primary">Hub</span>
                    </h1>
                </div>

                <div className="flex items-center gap-2">
                    <TemplateSelector />
                    <LanguageSelector />
                    <ThemeToggle />
                    <ExportMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
