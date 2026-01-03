import { useState } from 'react';
import { Plus, Save, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/cvStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { ExperienceEntry } from '@/types/cv';

const ExperiencePage = () => {
    const { cv, addExperience, updateExperience, removeExperience } = useCVStore();
    const [expanded, setExpanded] = useState<string | null>(cv.experience[0]?.id || null);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [newExperience, setNewExperience] = useState<Omit<ExperienceEntry, 'id'>>({
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        tasks: [''],
        technologies: [],
    });

    const handleAddExperience = () => {
        if (!newExperience.role || !newExperience.company) {
            toast.error('Please fill in role and company');
            return;
        }
        addExperience({
            ...newExperience,
            tasks: newExperience.tasks.filter((t) => t.trim()),
        });
        setNewExperience({
            role: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            tasks: [''],
            technologies: [],
        });
        toast.success('Experience added!');
    };

    const handleUpdateExperience = (id: string, data: Partial<ExperienceEntry>) => {
        updateExperience(id, data);
        toast.success('Experience updated!');
    };

    const handleDeleteExperience = (id: string) => {
        removeExperience(id);
        toast.success('Experience removed!');
    };

    const addTask = (index: number) => {
        const newTasks = [...newExperience.tasks];
        newTasks.splice(index + 1, 0, '');
        setNewExperience((prev) => ({ ...prev, tasks: newTasks }));
    };

    const updateTask = (index: number, value: string) => {
        const newTasks = [...newExperience.tasks];
        newTasks[index] = value;
        setNewExperience((prev) => ({ ...prev, tasks: newTasks }));
    };

    const removeTask = (index: number) => {
        if (newExperience.tasks.length === 1) return;
        const newTasks = newExperience.tasks.filter((_, i) => i !== index);
        setNewExperience((prev) => ({ ...prev, tasks: newTasks }));
    };

    return (
        <div className="max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Experience</h1>
                <p className="text-muted-foreground mt-1">
                    Add and manage your professional experience
                </p>
            </div>

            {/* Existing Experiences */}
            <div className="space-y-4">
                {cv.experience.map((exp) => (
                    <div
                        key={exp.id}
                        className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                        <button
                            onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                                <div className="text-left">
                                    <h4 className="font-medium">{exp.role}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {exp.company} • {exp.startDate} - {exp.endDate}
                                    </p>
                                </div>
                            </div>
                            {expanded === exp.id ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </button>

                        {expanded === exp.id && (
                            <div className="p-4 pt-0 border-t border-border space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Role</label>
                                        <input
                                            type="text"
                                            value={exp.role}
                                            onChange={(e) => handleUpdateExperience(exp.id, { role: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Company</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => handleUpdateExperience(exp.id, { company: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Location</label>
                                        <input
                                            type="text"
                                            value={exp.location}
                                            onChange={(e) => handleUpdateExperience(exp.id, { location: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Start</label>
                                            <input
                                                type="text"
                                                value={exp.startDate}
                                                onChange={(e) => handleUpdateExperience(exp.id, { startDate: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                                placeholder="Jan 2024"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">End</label>
                                            <input
                                                type="text"
                                                value={exp.endDate}
                                                onChange={(e) => handleUpdateExperience(exp.id, { endDate: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                                placeholder="Present"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tasks & Achievements</label>
                                    {exp.tasks.map((task, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={task}
                                                onChange={(e) => {
                                                    const newTasks = [...exp.tasks];
                                                    newTasks[index] = e.target.value;
                                                    handleUpdateExperience(exp.id, { tasks: newTasks });
                                                }}
                                                className="flex-1 px-3 py-2 rounded-lg border border-input bg-background"
                                                placeholder="Describe your achievement..."
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteExperience(exp.id)}
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

            {/* Add New Experience */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Add New Experience</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Role *</label>
                            <input
                                type="text"
                                value={newExperience.role}
                                onChange={(e) => setNewExperience((prev) => ({ ...prev, role: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Company *</label>
                            <input
                                type="text"
                                value={newExperience.company}
                                onChange={(e) => setNewExperience((prev) => ({ ...prev, company: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <input
                                type="text"
                                value={newExperience.location}
                                onChange={(e) => setNewExperience((prev) => ({ ...prev, location: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="City, Country"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Start Date</label>
                                <input
                                    type="text"
                                    value={newExperience.startDate}
                                    onChange={(e) => setNewExperience((prev) => ({ ...prev, startDate: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                    placeholder="Jan 2024"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">End Date</label>
                                <input
                                    type="text"
                                    value={newExperience.endDate}
                                    onChange={(e) => setNewExperience((prev) => ({ ...prev, endDate: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                    placeholder="Present"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tasks & Achievements</label>
                        {newExperience.tasks.map((task, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={task}
                                    onChange={(e) => updateTask(index, e.target.value)}
                                    className="flex-1 px-3 py-2 rounded-lg border border-input bg-background"
                                    placeholder="Describe your achievement..."
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => addTask(index)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                                {newExperience.tasks.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeTask(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Technologies (comma-separated)</label>
                        <input
                            type="text"
                            value={newExperience.technologies.join(', ')}
                            onChange={(e) =>
                                setNewExperience((prev) => ({
                                    ...prev,
                                    technologies: e.target.value.split(',').map((t) => t.trim()),
                                }))
                            }
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                            placeholder="React, Node.js, TypeScript"
                        />
                    </div>

                    <Button onClick={handleAddExperience} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePage;
