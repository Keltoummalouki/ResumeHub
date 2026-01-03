import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Eye, Download, Trash2, Star, MoreVertical, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCVVariants } from '@/db/hooks';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Swal from 'sweetalert2';

const CVsPage = () => {
    const { variants, addVariant, removeVariant, setDefault } = useCVVariants();
    const [showNewForm, setShowNewForm] = useState(false);
    const [newCVName, setNewCVName] = useState('');
    const [newCVTemplate, setNewCVTemplate] = useState<'classic' | 'modern' | 'minimal'>('classic');
    const [newCVLanguage, setNewCVLanguage] = useState<'fr' | 'en' | 'ar'>('fr');

    const handleCreateCV = async () => {
        if (!newCVName.trim()) {
            toast.error('Please enter a CV name');
            return;
        }

        await addVariant({
            name: newCVName,
            language: newCVLanguage,
            template: newCVTemplate,
            selectedExperienceIds: [],
            selectedProjectIds: [],
            selectedSkillIds: [],
            selectedEducationIds: [],
            selectedCertificationIds: [],
        });

        toast.success('CV created!');
        setNewCVName('');
        setShowNewForm(false);
    };

    const handleDelete = async (id: string, name: string, isDefault: boolean) => {
        if (isDefault) {
            toast.error('Cannot delete the default CV');
            return;
        }

        const result = await Swal.fire({
            title: 'Delete CV?',
            text: `Are you sure you want to delete "${name}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, delete it',
            cancelButtonText: 'Cancel',
        });

        if (result.isConfirmed) {
            await removeVariant(id);
            toast.success('CV deleted');
        }
    };

    const handleSetDefault = async (id: string) => {
        await setDefault(id);
        toast.success('Default CV updated');
    };

    const formatDate = (date?: Date) => {
        if (!date) return 'Never';
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        }).format(new Date(date));
    };

    const getTemplateColor = (template: string) => {
        switch (template) {
            case 'modern':
                return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'minimal':
                return 'bg-green-500/10 text-green-500 border-green-500/20';
            default:
                return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
        }
    };

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My CVs</h1>
                    <p className="text-muted-foreground mt-1">
                        Create and manage multiple CV variants for different opportunities
                    </p>
                </div>
                <Button onClick={() => setShowNewForm(!showNewForm)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New CV
                </Button>
            </div>

            {/* New CV Form */}
            {showNewForm && (
                <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold mb-4">Create New CV</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">CV Name</label>
                            <input
                                type="text"
                                value={newCVName}
                                onChange={(e) => setNewCVName(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="e.g., Frontend Developer CV, Internship CV"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Template</label>
                                <select
                                    value={newCVTemplate}
                                    onChange={(e) => setNewCVTemplate(e.target.value as typeof newCVTemplate)}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                >
                                    <option value="classic">Classic</option>
                                    <option value="modern">Modern</option>
                                    <option value="minimal">Minimal</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Language</label>
                                <select
                                    value={newCVLanguage}
                                    onChange={(e) => setNewCVLanguage(e.target.value as typeof newCVLanguage)}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                    <option value="ar">العربية</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleCreateCV}>Create CV</Button>
                            <Button variant="outline" onClick={() => setShowNewForm(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* CV Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {variants?.map((cv) => (
                    <div
                        key={cv.id}
                        className={cn(
                            'relative bg-card rounded-xl border p-5 transition-all duration-200 hover:shadow-lg',
                            cv.isDefault ? 'border-primary' : 'border-border hover:border-primary/50'
                        )}
                    >
                        {/* Default Badge */}
                        {cv.isDefault && (
                            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="h-3 w-3 fill-current" />
                                Default
                            </div>
                        )}

                        {/* Content */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link to={`/preview/${cv.id}`}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            Preview
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings2 className="h-4 w-4 mr-2" />
                                        Edit Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Download className="h-4 w-4 mr-2" />
                                        Export PDF
                                    </DropdownMenuItem>
                                    {!cv.isDefault && (
                                        <DropdownMenuItem onClick={() => handleSetDefault(cv.id)}>
                                            <Star className="h-4 w-4 mr-2" />
                                            Set as Default
                                        </DropdownMenuItem>
                                    )}
                                    {!cv.isDefault && (
                                        <DropdownMenuItem
                                            className="text-destructive focus:text-destructive"
                                            onClick={() => handleDelete(cv.id, cv.name, cv.isDefault)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <h3 className="font-semibold mb-2">{cv.name}</h3>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <span
                                className={cn(
                                    'text-xs px-2 py-0.5 rounded-full border font-medium',
                                    getTemplateColor(cv.template)
                                )}
                            >
                                {cv.template}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                {cv.language.toUpperCase()}
                            </span>
                        </div>

                        <div className="text-xs text-muted-foreground space-y-1">
                            <p>Created: {formatDate(cv.createdAt)}</p>
                            <p>Last exported: {formatDate(cv.lastExportedAt)}</p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                                <Link to={`/preview/${cv.id}`}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    Preview
                                </Link>
                            </Button>
                            <Button size="sm" className="flex-1">
                                <Download className="h-4 w-4 mr-1" />
                                Export
                            </Button>
                        </div>
                    </div>
                ))}

                {/* Empty State / Add New Card */}
                {(!variants || variants.length === 0) && (
                    <button
                        onClick={() => setShowNewForm(true)}
                        className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                    >
                        <Plus className="h-12 w-12 mb-2" />
                        <span className="font-medium">Create your first CV</span>
                    </button>
                )}
            </div>

            {/* Tips */}
            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                    💡 Pro Tip
                </h4>
                <p className="text-sm text-muted-foreground">
                    Create different CV variants for different job types. For example:
                    <br />
                    • <strong>Frontend CV</strong> - Focus on UI/UX skills and React projects
                    <br />
                    • <strong>Fullstack CV</strong> - Balance frontend and backend experience
                    <br />
                    • <strong>Internship CV</strong> - Emphasize education and learning projects
                </p>
            </div>
        </div>
    );
};

export default CVsPage;
