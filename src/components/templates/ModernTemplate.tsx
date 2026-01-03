import { TemplateProps } from './TemplateRenderer';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Github, Linkedin, Globe } from 'lucide-react';

const ModernTemplate = ({ data, language, accentColor = '#3b82f6' }: TemplateProps) => {
    const { t } = useTranslation();
    const { profile, experiences, projects, skills, education, certifications } = data;

    // Group skills by category
    const categories = ['languages', 'frameworks', 'databases', 'devops', 'design'];
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div className="bg-white text-black font-sans" style={{ minHeight: '297mm' }}>
            <div className="flex">
                {/* Sidebar */}
                <aside
                    className="w-1/3 p-6 text-white min-h-full"
                    style={{ backgroundColor: accentColor }}
                >
                    {/* Profile Photo Placeholder */}
                    {profile.profileImage ? (
                        <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/30">
                            <img
                                src={profile.profileImage}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-white/20 flex items-center justify-center text-4xl font-bold">
                            {profile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    )}

                    <h1 className="text-xl font-bold text-center mb-1">{profile.name}</h1>
                    <p className="text-sm text-center opacity-90 mb-6">
                        {language === 'en' ? 'Full Stack Web Developer' :
                            language === 'ar' ? 'مطورة ويب Full Stack' :
                                'Développeuse Web Full Stack'}
                    </p>

                    {/* Contact Info */}
                    <div className="space-y-2 text-sm mb-6">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{profile.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span>{profile.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Github className="h-4 w-4 flex-shrink-0" />
                            <span>{profile.github}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 flex-shrink-0" />
                            <span>{profile.linkedin}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 flex-shrink-0" />
                            <span>{profile.portfolio}</span>
                        </div>
                    </div>

                    {/* Skills in Sidebar */}
                    <div className="space-y-4">
                        <h2 className="text-sm font-bold uppercase tracking-wider border-b border-white/30 pb-1">
                            {t('sections.technicalSkills')}
                        </h2>
                        {categories.map(cat => {
                            const catSkills = skillsByCategory[cat];
                            if (!catSkills?.length) return null;
                            return (
                                <div key={cat}>
                                    <h3 className="text-xs font-semibold uppercase opacity-80 mb-1">
                                        {t(`skills.${cat}`)}
                                    </h3>
                                    <div className="flex flex-wrap gap-1">
                                        {catSkills.slice(0, 6).map(skill => (
                                            <span
                                                key={skill}
                                                className="text-xs px-2 py-0.5 bg-white/20 rounded"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Certifications */}
                    {certifications.length > 0 && (
                        <div className="mt-6">
                            <h2 className="text-sm font-bold uppercase tracking-wider border-b border-white/30 pb-1 mb-2">
                                {t('sections.certifications')}
                            </h2>
                            <ul className="text-xs space-y-1">
                                {certifications.map(cert => (
                                    <li key={cert.id}>• {cert.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="w-2/3 p-6">
                    {/* Experience */}
                    {experiences.length > 0 && (
                        <section className="mb-6">
                            <h2
                                className="text-lg font-bold uppercase tracking-wide border-b-2 pb-1 mb-3"
                                style={{ borderColor: accentColor, color: accentColor }}
                            >
                                {t('sections.experience')}
                            </h2>
                            <div className="space-y-4">
                                {experiences.filter(e => e.isVisible).map(exp => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-bold text-sm">{exp.role}</h3>
                                                <p className="text-sm" style={{ color: accentColor }}>
                                                    {exp.company}, {exp.location}
                                                </p>
                                            </div>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {exp.startDate} – {exp.endDate}
                                            </span>
                                        </div>
                                        <ul className="mt-1 text-xs text-gray-700 list-disc ml-4 space-y-0.5">
                                            {exp.tasks.map((task, i) => (
                                                <li key={i}>{task}</li>
                                            ))}
                                        </ul>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {exp.technologies.slice(0, 5).map(tech => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] px-1.5 py-0.5 rounded"
                                                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className="mb-6">
                            <h2
                                className="text-lg font-bold uppercase tracking-wide border-b-2 pb-1 mb-3"
                                style={{ borderColor: accentColor, color: accentColor }}
                            >
                                {t('sections.education')}
                            </h2>
                            <div className="space-y-3">
                                {education.map(edu => (
                                    <div key={edu.id} className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-sm">{edu.degree}</h3>
                                            <p className="text-xs text-gray-600">
                                                {edu.institution} – {edu.location}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 whitespace-nowrap">{edu.endDate}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section>
                            <h2
                                className="text-lg font-bold uppercase tracking-wide border-b-2 pb-1 mb-3"
                                style={{ borderColor: accentColor, color: accentColor }}
                            >
                                {t('sections.projects')}
                            </h2>
                            <div className="space-y-3">
                                {projects.filter(p => p.isVisible).slice(0, 3).map(project => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-sm">
                                                {project.link ? (
                                                    <a
                                                        href={project.link}
                                                        className="hover:underline"
                                                        style={{ color: accentColor }}
                                                    >
                                                        {project.name}
                                                    </a>
                                                ) : project.name}
                                            </h3>
                                            <span className="text-xs text-gray-500">{project.date}</span>
                                        </div>
                                        <p className="text-xs text-gray-700 mt-0.5">{project.description}</p>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 5).map(tech => (
                                                <span
                                                    key={tech}
                                                    className="text-[10px] px-1.5 py-0.5 rounded"
                                                    style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ModernTemplate;
