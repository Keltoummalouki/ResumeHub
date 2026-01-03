import { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/cvStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const skillCategories = [
    { key: 'languages', label: 'Programming Languages', color: 'bg-blue-500' },
    { key: 'frameworks', label: 'Frameworks & Libraries', color: 'bg-green-500' },
    { key: 'databases', label: 'Databases', color: 'bg-purple-500' },
    { key: 'devops', label: 'DevOps & Tools', color: 'bg-orange-500' },
    { key: 'design', label: 'Design Tools', color: 'bg-pink-500' },
    { key: 'projectManagement', label: 'Project Management', color: 'bg-yellow-500' },
    { key: 'versionControl', label: 'Version Control', color: 'bg-gray-500' },
    { key: 'modeling', label: 'Modeling & Architecture', color: 'bg-cyan-500' },
] as const;

const SkillsPage = () => {
    const { cv, updateSkills } = useCVStore();
    const [newSkill, setNewSkill] = useState<{ [key: string]: string }>({});

    const handleAddSkill = (category: keyof typeof cv.skills) => {
        const skill = newSkill[category]?.trim();
        if (!skill) return;

        const currentSkills = cv.skills[category] as string[];
        if (currentSkills.includes(skill)) {
            toast.error('Skill already exists');
            return;
        }

        updateSkills({ [category]: [...currentSkills, skill] });
        setNewSkill((prev) => ({ ...prev, [category]: '' }));
        toast.success('Skill added!');
    };

    const handleRemoveSkill = (category: keyof typeof cv.skills, skill: string) => {
        const currentSkills = cv.skills[category] as string[];
        updateSkills({ [category]: currentSkills.filter((s) => s !== skill) });
        toast.success('Skill removed!');
    };

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your technical skills and competencies
                </p>
            </div>

            {/* Skills by Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories.map((category) => {
                    const skills = cv.skills[category.key as keyof typeof cv.skills] as string[];

                    return (
                        <div
                            key={category.key}
                            className="bg-card rounded-xl border border-border p-6"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className={cn('w-3 h-3 rounded-full', category.color)} />
                                <h3 className="font-semibold">{category.label}</h3>
                                <span className="text-xs text-muted-foreground">({skills.length})</span>
                            </div>

                            {/* Skills Tags */}
                            <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
                                {skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-accent hover:bg-accent/80 transition-colors group"
                                    >
                                        {skill}
                                        <button
                                            onClick={() => handleRemoveSkill(category.key as keyof typeof cv.skills, skill)}
                                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-3 w-3 text-destructive" />
                                        </button>
                                    </span>
                                ))}
                                {skills.length === 0 && (
                                    <span className="text-sm text-muted-foreground">No skills added</span>
                                )}
                            </div>

                            {/* Add Skill Input */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newSkill[category.key] || ''}
                                    onChange={(e) =>
                                        setNewSkill((prev) => ({ ...prev, [category.key]: e.target.value }))
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleAddSkill(category.key as keyof typeof cv.skills);
                                        }
                                    }}
                                    className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                                    placeholder={`Add ${category.label.toLowerCase()}...`}
                                />
                                <Button
                                    size="icon"
                                    onClick={() => handleAddSkill(category.key as keyof typeof cv.skills)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Stats */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Skills Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skillCategories.slice(0, 4).map((category) => {
                        const count = (cv.skills[category.key as keyof typeof cv.skills] as string[]).length;
                        return (
                            <div key={category.key} className="text-center">
                                <div className="text-2xl font-bold">{count}</div>
                                <div className="text-xs text-muted-foreground">{category.label}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default SkillsPage;
