import { FileText, Layout, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCVStore } from '@/store/cvStore';
import { TemplateType } from '@/types/cv';

const templates: { id: TemplateType; label: string; icon: React.ReactNode }[] = [
    { id: 'classic', label: 'Classique', icon: <FileText className="h-4 w-4" /> },
    { id: 'modern', label: 'Moderne', icon: <Layout className="h-4 w-4" /> },
    { id: 'minimal', label: 'Minimaliste', icon: <Minimize2 className="h-4 w-4" /> },
];

const TemplateSelector = () => {
    const { templateId } = useCVStore((state) => state.settings);
    const setTemplate = useCVStore((state) => state.setTemplate);

    const currentTemplate = templates.find((t) => t.id === templateId) || templates[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    {currentTemplate.icon}
                    <span className="hidden sm:inline">{currentTemplate.label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {templates.map((template) => (
                    <DropdownMenuItem
                        key={template.id}
                        onClick={() => setTemplate(template.id)}
                        className={templateId === template.id ? 'bg-accent' : ''}
                    >
                        {template.icon}
                        <span className="ml-2">{template.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TemplateSelector;
