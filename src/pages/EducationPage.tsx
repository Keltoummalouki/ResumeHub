import { useState } from 'react';
import { Plus, Trash2, GraduationCap, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCVStore } from '@/store/cvStore';
import { toast } from 'sonner';
import { EducationEntry } from '@/types/cv';

const EducationPage = () => {
    const { cv, addEducation, updateEducation, removeEducation } = useCVStore();
    const [expanded, setExpanded] = useState<string | null>(cv.education[0]?.id || null);

    const [newEducation, setNewEducation] = useState<Omit<EducationEntry, 'id'>>({
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const handleAddEducation = () => {
        if (!newEducation.degree || !newEducation.institution) {
            toast.error('Please fill in degree and institution');
            return;
        }
        addEducation(newEducation);
        setNewEducation({
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            description: '',
        });
        toast.success('Education added!');
    };

    const handleDeleteEducation = (id: string) => {
        removeEducation(id);
        toast.success('Education removed!');
    };

    return (
        <div className="max-w-3xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Education</h1>
                <p className="text-muted-foreground mt-1">
                    Add your educational background and certifications
                </p>
            </div>

            {/* Existing Education */}
            <div className="space-y-4">
                {cv.education.map((edu) => (
                    <div
                        key={edu.id}
                        className="bg-card rounded-xl border border-border overflow-hidden"
                    >
                        <button
                            onClick={() => setExpanded(expanded === edu.id ? null : edu.id)}
                            className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-medium">{edu.degree}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {edu.institution} • {edu.endDate}
                                    </p>
                                </div>
                            </div>
                            {expanded === edu.id ? (
                                <ChevronUp className="h-5 w-5" />
                            ) : (
                                <ChevronDown className="h-5 w-5" />
                            )}
                        </button>

                        {expanded === edu.id && (
                            <div className="p-4 pt-0 border-t border-border space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-sm font-medium">Degree / Certification</label>
                                        <input
                                            type="text"
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Institution</label>
                                        <input
                                            type="text"
                                            value={edu.institution}
                                            onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Location</label>
                                        <input
                                            type="text"
                                            value={edu.location || ''}
                                            onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">End Date</label>
                                        <input
                                            type="text"
                                            value={edu.endDate}
                                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                            placeholder="2024 or Present"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Description (optional)</label>
                                    <textarea
                                        value={edu.description || ''}
                                        onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-input bg-background resize-none"
                                        rows={2}
                                        placeholder="Brief description of your studies..."
                                    />
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDeleteEducation(edu.id)}
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

            {/* Add New Education */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold mb-4">Add New Education</h3>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Degree / Certification *</label>
                        <input
                            type="text"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, degree: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                            placeholder="Bachelor of Science in Computer Science"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Institution *</label>
                            <input
                                type="text"
                                value={newEducation.institution}
                                onChange={(e) => setNewEducation((prev) => ({ ...prev, institution: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="University Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Location</label>
                            <input
                                type="text"
                                value={newEducation.location}
                                onChange={(e) => setNewEducation((prev) => ({ ...prev, location: e.target.value }))}
                                className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                                placeholder="City, Country"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <input
                            type="text"
                            value={newEducation.endDate}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, endDate: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background"
                            placeholder="2024 or Present"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description (optional)</label>
                        <textarea
                            value={newEducation.description}
                            onChange={(e) => setNewEducation((prev) => ({ ...prev, description: e.target.value }))}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background resize-none"
                            rows={2}
                            placeholder="Brief description..."
                        />
                    </div>

                    <Button onClick={handleAddEducation} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                    </Button>
                </div>
            </div>

            {/* Certifications Quick Add */}
            <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Certifications</h3>
                </div>
                <div className="space-y-2">
                    {cv.certifications.map((cert, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-accent/50 rounded-lg"
                        >
                            <span className="text-sm">{cert.name}</span>
                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-primary hover:underline"
                                >
                                    View Certificate
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EducationPage;
