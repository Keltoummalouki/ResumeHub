import { Link } from 'react-router-dom';
import { FileText, Download, Eye, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface CVVariant {
    id: string;
    name: string;
    template: string;
    language: string;
    lastExported?: Date;
    updatedAt: Date;
}

interface CVListProps {
    cvs: CVVariant[];
    onDelete?: (id: string) => void;
    onExport?: (id: string) => void;
}

const CVList = ({ cvs, onDelete, onExport }: CVListProps) => {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(date));
    };

    const getTemplateColor = (template: string) => {
        switch (template) {
            case 'modern':
                return 'bg-blue-500/10 text-blue-500';
            case 'minimal':
                return 'bg-green-500/10 text-green-500';
            case 'creative':
                return 'bg-purple-500/10 text-purple-500';
            default:
                return 'bg-gray-500/10 text-gray-500';
        }
    };

    return (
        <div className="space-y-3">
            {cvs.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-dashed border-border">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No CV variants yet</p>
                    <Button asChild className="mt-4">
                        <Link to="/dashboard/cvs/new">Create your first CV</Link>
                    </Button>
                </div>
            ) : (
                cvs.map((cv) => (
                    <div
                        key={cv.id}
                        className="flex items-center justify-between p-4 bg-card rounded-xl border border-border hover:border-primary/20 transition-all duration-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">{cv.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span
                                        className={cn(
                                            'text-xs px-2 py-0.5 rounded-full font-medium',
                                            getTemplateColor(cv.template)
                                        )}
                                    >
                                        {cv.template}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        {cv.language.toUpperCase()}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                        • Updated {formatDate(cv.updatedAt)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <Link to={`/preview/${cv.id}`}>
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onExport?.(cv.id)}
                            >
                                <Download className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                        className="text-destructive focus:text-destructive"
                                        onClick={() => onDelete?.(cv.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CVList;
