import { TemplateProps } from './TemplateRenderer';
import { useTranslation } from 'react-i18next';

const ClassicTemplate = ({ data, language }: TemplateProps) => {
    const { t } = useTranslation();
    const { profile, experiences, projects, skills, education, certifications } = data;

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill.name);
        return acc;
    }, {} as Record<string, string[]>);

    const formatArray = (arr: string[]) => arr.join(', ') + '.';

    return (
        <div className="bg-white text-black p-8 font-sans" style={{ minHeight: '297mm' }}>
            {/* Header */}
            <header className="mb-4">
                <div className="mb-3">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight mb-0.5">
                        {language === 'en' ? 'Full Stack Web Developer' :
                            language === 'ar' ? 'مطورة ويب Full Stack' :
                                'Développeuse Web Full Stack'}
                    </h1>
                    <h2 className="text-xl font-bold uppercase tracking-wide">
                        {profile.name}
                    </h2>
                </div>

                <div className="border-t-2 border-black pt-2 pb-2">
                    <div className="text-[11px] leading-relaxed">
                        <p className="mb-0.5">
                            <span className="font-bold">{t('header.phone')}:</span> {profile.phone} |{' '}
                            <span className="font-bold">{t('header.email')}:</span>{' '}
                            <a href={`mailto:${profile.email}`} className="text-black no-underline hover:underline">
                                {profile.email}
                            </a>{' '}
                            |{' '}
                            <span className="font-bold">{t('header.address')}:</span> {profile.address}
                        </p>
                        <p>
                            <span className="font-bold">{t('header.github')}:</span>{' '}
                            <a href={`https://github.com/${profile.github}`} className="text-black no-underline hover:underline">
                                {profile.github}
                            </a>{' '}
                            |{' '}
                            <span className="font-bold">{t('header.linkedin')}:</span>{' '}
                            <a href={`https://linkedin.com/in/${profile.linkedin}`} className="text-black no-underline hover:underline">
                                {profile.linkedin}
                            </a>{' '}
                            |{' '}
                            <span className="font-bold">{t('header.portfolio')}:</span>{' '}
                            <a href={`https://${profile.portfolio}`} className="text-black no-underline hover:underline">
                                {profile.portfolio}
                            </a>
                        </p>
                    </div>
                </div>
            </header>

            {/* Technical Skills */}
            <section className="mb-3">
                <div className="border-t-2 border-black pt-2 mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wide">{t('sections.technicalSkills')}</h3>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] leading-relaxed">
                    <div>
                        {skillsByCategory.languages && (
                            <p className="mb-0.5">
                                <span className="font-bold">{t('skills.languages')}:</span> {formatArray(skillsByCategory.languages)}
                            </p>
                        )}
                        {skillsByCategory.frameworks && (
                            <p className="mb-0.5">
                                <span className="font-bold">{t('skills.frameworks')}:</span> {formatArray(skillsByCategory.frameworks)}
                            </p>
                        )}
                        {skillsByCategory.devops && (
                            <p>
                                <span className="font-bold">{t('skills.devops')}:</span> {formatArray(skillsByCategory.devops)}
                            </p>
                        )}
                    </div>
                    <div>
                        {skillsByCategory.databases && (
                            <p className="mb-0.5">
                                <span className="font-bold">{t('skills.databases')}:</span> {formatArray(skillsByCategory.databases)}
                            </p>
                        )}
                        {skillsByCategory.projectManagement && (
                            <p className="mb-0.5">
                                <span className="font-bold">{t('skills.projectManagement')}:</span> {formatArray(skillsByCategory.projectManagement)}
                            </p>
                        )}
                        {skillsByCategory.versionControl && (
                            <p className="mb-0.5">
                                <span className="font-bold">{t('skills.versionControl')}:</span> {formatArray(skillsByCategory.versionControl)}
                            </p>
                        )}
                        {skillsByCategory.design && (
                            <p>
                                <span className="font-bold">{t('skills.design')}:</span> {formatArray(skillsByCategory.design)}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Experience */}
            {experiences.length > 0 && (
                <section className="mb-3">
                    <div className="border-t-2 border-black pt-2 mb-2">
                        <h3 className="text-sm font-bold uppercase tracking-wide">{t('sections.experience')}</h3>
                    </div>
                    <div className="space-y-2 text-[11px] leading-relaxed">
                        {experiences.filter(e => e.isVisible).map((exp) => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-start mb-0.5">
                                    <h4 className="font-bold">
                                        {exp.role} – {exp.company}, {exp.location}
                                    </h4>
                                    <span className="font-bold whitespace-nowrap ml-4">
                                        {exp.startDate} – {exp.endDate}
                                    </span>
                                </div>
                                <ul className="list-disc ml-4 space-y-0.5 mb-1">
                                    {exp.tasks.map((task, index) => (
                                        <li key={index}>{task}</li>
                                    ))}
                                </ul>
                                <p>
                                    <span className="font-bold">{t('experience.technologies')}:</span>
                                </p>
                                <p className="ml-4">{exp.technologies.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-3">
                    <div className="border-t-2 border-black pt-2 mb-2">
                        <h3 className="text-sm font-bold uppercase tracking-wide">{t('sections.education')}</h3>
                    </div>
                    <div className="space-y-2 text-[11px] leading-relaxed">
                        {education.map((edu) => (
                            <div key={edu.id} className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold">{edu.degree}</h4>
                                    <p>{edu.description || `${edu.institution} – ${edu.location}`}</p>
                                </div>
                                <span className="font-bold whitespace-nowrap ml-4">{edu.endDate}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
                <section className="mb-3">
                    <div className="border-t-2 border-black pt-2 mb-2">
                        <h3 className="text-sm font-bold uppercase tracking-wide">{t('sections.projects')}</h3>
                    </div>
                    <div className="space-y-2 text-[11px] leading-relaxed">
                        {projects.filter(p => p.isVisible).map((project) => (
                            <div key={project.id}>
                                <div className="flex justify-between items-start mb-0.5">
                                    <h4 className="font-bold">
                                        {project.link ? (
                                            <a href={project.link} className="text-black no-underline hover:underline">
                                                {project.name} – {t('common.webApp')}
                                            </a>
                                        ) : (
                                            <>{project.name} – {t('common.webApp')}</>
                                        )}
                                    </h4>
                                    <span className="font-bold whitespace-nowrap ml-4">{project.date}</span>
                                </div>
                                <p className="mb-0.5">{project.description}</p>
                                <ul className="list-disc ml-4 space-y-0.5 mb-1">
                                    {project.highlights.map((highlight, index) => (
                                        <li key={index}>{highlight}</li>
                                    ))}
                                </ul>
                                <p>
                                    <span className="font-bold">{t('experience.technologies')}:</span>
                                </p>
                                <p className="ml-4">{project.technologies.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
                <section className="mb-3">
                    <div className="border-t-2 border-black pt-2 mb-2">
                        <h3 className="text-sm font-bold uppercase tracking-wide">{t('sections.certifications')}</h3>
                    </div>
                    <div className="text-[11px] leading-relaxed">
                        <p>
                            {certifications.map((cert, index) => (
                                <span key={cert.id}>
                                    {cert.link ? (
                                        <a href={cert.link} className="text-black no-underline hover:underline">
                                            {cert.name}
                                        </a>
                                    ) : (
                                        cert.name
                                    )}
                                    {index < certifications.length - 1 && ', '}
                                </span>
                            ))}
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
