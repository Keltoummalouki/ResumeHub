import { TemplateProps } from './TemplateRenderer';
import { useTranslation } from 'react-i18next';

const MinimalTemplate = ({ data, language }: TemplateProps) => {
    const { t } = useTranslation();
    const { profile, experiences, projects, skills, education, certifications } = data;

    // Get top skills by category for a clean display
    const topSkills = skills.slice(0, 12).map(s => s.name);

    return (
        <div className="bg-white text-black font-sans p-12" style={{ minHeight: '297mm' }}>
            {/* Simple Header */}
            <header className="text-center mb-10">
                <h1 className="text-4xl font-light tracking-wide mb-2">{profile.name}</h1>
                <p className="text-lg text-gray-600 mb-4">
                    {language === 'en' ? 'Full Stack Web Developer' :
                        language === 'ar' ? 'مطورة ويب Full Stack' :
                            'Développeuse Web Full Stack'}
                </p>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-3 flex-wrap">
                    <span>{profile.email}</span>
                    <span className="text-gray-300">|</span>
                    <span>{profile.phone}</span>
                    <span className="text-gray-300">|</span>
                    <span>{profile.address}</span>
                    <span className="text-gray-300">|</span>
                    <a href={`https://github.com/${profile.github}`} className="hover:text-gray-700">
                        github.com/{profile.github}
                    </a>
                </div>
            </header>

            {/* Simple Divider */}
            <div className="border-t border-gray-200 mb-8" />

            {/* Skills - Simple List */}
            {topSkills.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                        {t('sections.technicalSkills')}
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        {topSkills.join(' • ')}
                    </p>
                </section>
            )}

            {/* Experience */}
            {experiences.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                        {t('sections.experience')}
                    </h2>
                    <div className="space-y-6">
                        {experiences.filter(e => e.isVisible).map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium">{exp.role}</h3>
                                    <span className="text-sm text-gray-400">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <p className="text-sm text-gray-500 mb-2">{exp.company}, {exp.location}</p>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    {exp.tasks.map((task, i) => (
                                        <li key={i}>— {task}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                        {t('sections.education')}
                    </h2>
                    <div className="space-y-3">
                        {education.map(edu => (
                            <div key={edu.id} className="flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">{edu.degree}</h3>
                                    <p className="text-sm text-gray-500">{edu.institution}</p>
                                </div>
                                <span className="text-sm text-gray-400">{edu.endDate}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                        {t('sections.projects')}
                    </h2>
                    <div className="space-y-4">
                        {projects.filter(p => p.isVisible).slice(0, 4).map(project => (
                            <div key={project.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-medium">
                                        {project.link ? (
                                            <a href={project.link} className="hover:text-gray-600">
                                                {project.name} ↗
                                            </a>
                                        ) : project.name}
                                    </h3>
                                    <span className="text-sm text-gray-400">{project.date}</span>
                                </div>
                                <p className="text-sm text-gray-600">{project.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <section>
                    <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                        {t('sections.certifications')}
                    </h2>
                    <p className="text-sm text-gray-600">
                        {certifications.map(c => c.name).join(' • ')}
                    </p>
                </section>
            )}
        </div>
    );
};

export default MinimalTemplate;
