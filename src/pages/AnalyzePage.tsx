import { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Info, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProfile, useExperiences, useProjects, useSkills, useEducation, useCertifications } from '@/db/hooks';
import { cn } from '@/lib/utils';

interface AnalysisResult {
    type: 'success' | 'warning' | 'info';
    category: string;
    message: string;
    suggestion?: string;
}

const AnalyzePage = () => {
    const { profile } = useProfile();
    const { experiences } = useExperiences();
    const { projects } = useProjects();
    const { skills } = useSkills();
    const { education } = useEducation();
    const { certifications } = useCertifications();

    const [jobDescription, setJobDescription] = useState('');
    const [matchResults, setMatchResults] = useState<{ matched: string[]; missing: string[] } | null>(null);

    // Analyze CV completeness and quality
    const analyzeCV = (): AnalysisResult[] => {
        const results: AnalysisResult[] = [];

        // Profile checks
        if (!profile?.name) {
            results.push({ type: 'warning', category: 'Profile', message: 'Name is missing', suggestion: 'Add your full name' });
        }
        if (!profile?.email) {
            results.push({ type: 'warning', category: 'Profile', message: 'Email is missing', suggestion: 'Add your email address' });
        }
        if (!profile?.phone) {
            results.push({ type: 'info', category: 'Profile', message: 'Phone number is missing', suggestion: 'Consider adding a phone number' });
        }
        if (!profile?.github) {
            results.push({ type: 'info', category: 'Profile', message: 'GitHub is missing', suggestion: 'Add your GitHub to showcase your work' });
        }
        if (!profile?.linkedin) {
            results.push({ type: 'info', category: 'Profile', message: 'LinkedIn is missing', suggestion: 'Add your LinkedIn for professional networking' });
        }
        if (profile?.name && profile?.email) {
            results.push({ type: 'success', category: 'Profile', message: 'Contact info is complete' });
        }

        // Experience checks
        if (!experiences || experiences.length === 0) {
            results.push({ type: 'warning', category: 'Experience', message: 'No experience added', suggestion: 'Add at least one work experience or internship' });
        } else {
            if (experiences.length < 2) {
                results.push({ type: 'info', category: 'Experience', message: 'Only 1 experience entry', suggestion: 'Consider adding more relevant experiences' });
            } else {
                results.push({ type: 'success', category: 'Experience', message: `${experiences.length} experiences documented` });
            }

            // Check for task descriptions
            const expWithFewTasks = experiences.filter(e => e.tasks.length < 2);
            if (expWithFewTasks.length > 0) {
                results.push({ type: 'warning', category: 'Experience', message: 'Some experiences have few tasks', suggestion: 'Add 3-5 bullet points per experience' });
            }
        }

        // Projects checks
        if (!projects || projects.length === 0) {
            results.push({ type: 'warning', category: 'Projects', message: 'No projects added', suggestion: 'Add projects to showcase your skills' });
        } else {
            if (projects.length >= 2) {
                results.push({ type: 'success', category: 'Projects', message: `${projects.length} projects documented` });
            }

            const projectsWithLinks = projects.filter(p => p.link);
            if (projectsWithLinks.length === 0) {
                results.push({ type: 'info', category: 'Projects', message: 'No project links', suggestion: 'Add GitHub/demo links to your projects' });
            } else {
                results.push({ type: 'success', category: 'Projects', message: `${projectsWithLinks.length} projects have links` });
            }
        }

        // Skills checks
        if (!skills || skills.length === 0) {
            results.push({ type: 'warning', category: 'Skills', message: 'No skills added', suggestion: 'Add your technical skills' });
        } else {
            if (skills.length >= 10) {
                results.push({ type: 'success', category: 'Skills', message: `${skills.length} skills documented` });
            } else {
                results.push({ type: 'info', category: 'Skills', message: `Only ${skills.length} skills`, suggestion: 'Consider adding more relevant skills' });
            }
        }

        // Education checks
        if (!education || education.length === 0) {
            results.push({ type: 'warning', category: 'Education', message: 'No education added', suggestion: 'Add your educational background' });
        } else {
            results.push({ type: 'success', category: 'Education', message: `${education.length} education entries` });
        }

        // Certifications
        if (certifications && certifications.length > 0) {
            results.push({ type: 'success', category: 'Certifications', message: `${certifications.length} certifications added` });
        } else {
            results.push({ type: 'info', category: 'Certifications', message: 'No certifications', suggestion: 'Add relevant certifications to stand out' });
        }

        return results;
    };

    // Match CV against job description
    const matchJobDescription = () => {
        if (!jobDescription.trim()) return;

        // Extract keywords from job description
        const techKeywords = [
            'react', 'vue', 'angular', 'node', 'express', 'laravel', 'php', 'python', 'java',
            'javascript', 'typescript', 'html', 'css', 'tailwind', 'bootstrap', 'sass',
            'mongodb', 'mysql', 'postgresql', 'redis', 'docker', 'kubernetes', 'aws', 'azure',
            'git', 'github', 'gitlab', 'ci/cd', 'agile', 'scrum', 'rest', 'graphql', 'api',
            'next.js', 'nuxt', 'nestjs', 'django', 'flask', 'spring', 'sql', 'nosql',
            'figma', 'adobe', 'photoshop', 'illustrator', 'xd', 'sketch',
            'linux', 'ubuntu', 'nginx', 'apache', 'jenkins', 'terraform'
        ];

        const jobLower = jobDescription.toLowerCase();
        const foundKeywords = techKeywords.filter(kw => jobLower.includes(kw));

        // Get user's skills
        const userSkills = skills?.map(s => s.name.toLowerCase()) || [];
        const projectTech = projects?.flatMap(p => p.technologies.map(t => t.toLowerCase())) || [];
        const expTech = experiences?.flatMap(e => e.technologies.map(t => t.toLowerCase())) || [];

        const allUserTech = [...new Set([...userSkills, ...projectTech, ...expTech])];

        const matched = foundKeywords.filter(kw =>
            allUserTech.some(tech => tech.includes(kw) || kw.includes(tech))
        );
        const missing = foundKeywords.filter(kw =>
            !allUserTech.some(tech => tech.includes(kw) || kw.includes(tech))
        );

        setMatchResults({ matched, missing });
    };

    const results = analyzeCV();
    const successCount = results.filter(r => r.type === 'success').length;
    const warningCount = results.filter(r => r.type === 'warning').length;
    const infoCount = results.filter(r => r.type === 'info').length;
    const score = Math.round((successCount / results.length) * 100);

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'info': return <Info className="h-5 w-5 text-blue-500" />;
            default: return null;
        }
    };

    return (
        <div className="max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Sparkles className="h-8 w-8 text-primary" />
                    CV Analyzer
                </h1>
                <p className="text-muted-foreground mt-1">
                    Get insights and suggestions to improve your CV
                </p>
            </div>

            {/* Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="text-4xl font-bold text-primary mb-1">{score}%</div>
                    <div className="text-sm text-muted-foreground">Completeness</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="text-4xl font-bold text-green-500 mb-1">{successCount}</div>
                    <div className="text-sm text-muted-foreground">Strengths</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="text-4xl font-bold text-yellow-500 mb-1">{warningCount}</div>
                    <div className="text-sm text-muted-foreground">Issues</div>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="text-4xl font-bold text-blue-500 mb-1">{infoCount}</div>
                    <div className="text-sm text-muted-foreground">Suggestions</div>
                </div>
            </div>

            {/* Analysis Results */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Analysis Results
                </h2>
                <div className="space-y-3">
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className={cn(
                                'flex items-start gap-3 p-3 rounded-lg',
                                result.type === 'success' && 'bg-green-500/10',
                                result.type === 'warning' && 'bg-yellow-500/10',
                                result.type === 'info' && 'bg-blue-500/10'
                            )}
                        >
                            {getIcon(result.type)}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium px-2 py-0.5 bg-muted rounded">
                                        {result.category}
                                    </span>
                                    <span className="text-sm font-medium">{result.message}</span>
                                </div>
                                {result.suggestion && (
                                    <p className="text-sm text-muted-foreground mt-1">
                                        💡 {result.suggestion}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Job Matcher */}
            <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Job Matcher
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Paste a job description to see how well your CV matches and what skills you might be missing.
                </p>
                <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here..."
                    className="w-full h-32 px-4 py-3 rounded-lg border border-input bg-background resize-none text-sm"
                />
                <Button onClick={matchJobDescription} className="mt-3">
                    Analyze Match
                </Button>

                {matchResults && (
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-500/10 rounded-lg p-4">
                            <h3 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Matched Skills ({matchResults.matched.length})
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {matchResults.matched.length > 0 ? (
                                    matchResults.matched.map(skill => (
                                        <span key={skill} className="text-xs px-2 py-1 bg-green-500/20 rounded text-green-700">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-muted-foreground">No matches found</span>
                                )}
                            </div>
                        </div>
                        <div className="bg-red-500/10 rounded-lg p-4">
                            <h3 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Missing Skills ({matchResults.missing.length})
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {matchResults.missing.length > 0 ? (
                                    matchResults.missing.map(skill => (
                                        <span key={skill} className="text-xs px-2 py-1 bg-red-500/20 rounded text-red-700">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-muted-foreground">You have all required skills!</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyzePage;
