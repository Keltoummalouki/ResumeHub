import { useState } from 'react';
import { Plus, Save, Trash2, ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/cvStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ProjectEntry } from '@/types/cv';

const ProjectsPage = () => {
    const { cv, addProject, updateProject, removeProject } = useCVStore();
    const [expanded, setExpanded] = useState<string | null>(cv.projects[0]?.id || null);

    const [newProject, setNewProject] = useState<Omit<ProjectEntry, 'id'>>({
        name: '',
        date: '',
        description: '',
        highlights: [''],
        technologies: [],
        link: '',
    });

    const handleAddProject = () => {
        if (!newProject.name) {
            toast.error('Please fill in project name');
            return;
        }
        addProject({
            ...newProject,
            highlights: newProject.highlights.filter((h) => h.trim()),
        });
        setNewProject({
            name: '',
            date: '',
            description: '',
            highlights: [''],
            technologies: [],
            link: '',
        });
        toast.success('Project added!');
    };

    const handleDeleteProject = (id: string) => {
        removeProject(id);
        toast.success('Project removed!');
    };

    return (
        <div className="max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
                <p className="text-muted-foreground mt-1">
                    Showcase your best work and side projects
                </p>
            </div>

            {/* Existing Projects */}
            <div className="space-y-4">
                {cv.projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                        <button
                            onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-left">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{project.name}</h4>
                                        {project.link && (
                                            <ExternalLink className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {project.date} • {project.technologies.slice(0, 3).join(', ')}
                                        {project.technologies.length > 3 && '...'}
                                    </p>
                                </div>
                            </div>
                            {expanded === project.id ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </button>

                        {expanded === project.id && (
                            <div className="p-4 pt-0 border-t border-border space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Project Name</label>
                                        <input
                                            type="text"
                                            value={project.name}
                                            onChange={(e) => updateProject(project.id, { name: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date</label>
                                        <input
                                            type="text"
                                            value={project.date}
                                            onChange={(e) => updateProject(project.id, { date: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description</label>
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-input bg-background resize-none"
                                        rows={2}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Link (GitHub, Demo)</label>
                                    <input
                                        type="url"
                                        value={project.link || ''}
                                        onChange={(e) => updateProject(project.id, { link: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        placeholder="https://github.com/..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Technologies</label>
                                    <input
                                        type="text"
                                        value={project.technologies.join(', ')}
                                        onChange={(e) =>
                                            updateProject(project.id, {
                                                technologies: e.target.value.split(',').map((t) => t.trim()),
                                            })
                                        }
                                        className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        placeholder="React, Node.js, MongoDB"
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteProject(project.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Add New Project */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Add New Project</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Project Name *</label>
                            <input
                                type="text"
                                value={newProject.name}
                                onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="My Awesome Project"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date</label>
                            <input
                                type="text"
                                value={newProject.date}
                                onChange={(e) => setNewProject((prev) => ({ ...prev, date: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="December 2025"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            value={newProject.description}
                            onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background resize-none"
                            rows={2}
                            placeholder="Brief description of your project..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Link (GitHub, Demo)</label>
                        <input
                            type="url"
                            value={newProject.link}
                            onChange={(e) => setNewProject((prev) => ({ ...prev, link: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                            placeholder="https://github.com/..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Technologies</label>
                        <input
                            type="text"
                            value={newProject.technologies.join(', ')}
                            onChange={(e) =>
                                setNewProject((prev) => ({
                                    ...prev,
                                    technologies: e.target.value.split(',').map((t) => t.trim()),
                                }))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    <Button onClick={handleAddProject} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Project
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
