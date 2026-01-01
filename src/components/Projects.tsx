import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';

const Projects = () => {
    const { t } = useTranslation();
    const { projects } = useCVStore((state) => state.cv);

    // Get translated content for each project
    const getTranslatedProject = (projectName: string) => {
        const projectKey = projectName.toLowerCase().replace(/-/g, '').replace(/\s/g, '');

        if (projectKey.includes('truckflow')) {
            return {
                description: t('cv.projects.truckflow.description'),
                highlights: t('cv.projects.truckflow.highlights', { returnObjects: true }) as string[],
            };
        }
        if (projectKey.includes('reservez') || projectKey.includes('réservez')) {
            return {
                description: t('cv.projects.reservezmoi.description'),
                highlights: t('cv.projects.reservezmoi.highlights', { returnObjects: true }) as string[],
            };
        }
        return null;
    };

    return (
        <div className="space-y-2 text-[11px] leading-relaxed text-black">
            {projects.map((project) => {
                const translated = getTranslatedProject(project.name);
                const description = translated?.description || project.description;
                const highlights = translated?.highlights || project.highlights;

                return (
                    <div key={project.id}>
                        <div className="flex justify-between items-start mb-0.5">
                            <h4 className="font-bold">
                                {project.link ? (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-black no-underline hover:underline"
                                    >
                                        {project.name} – {t('common.webApp')}
                                    </a>
                                ) : (
                                    <>{project.name} – {t('common.webApp')}</>
                                )}
                            </h4>
                            <span className="font-bold whitespace-nowrap ml-4">{project.date}</span>
                        </div>
                        <p className="mb-0.5">{description}</p>
                        <ul className="list-disc ml-4 space-y-0.5 mb-1">
                            {highlights.map((highlight, index) => (
                                <li key={index}>{highlight}</li>
                            ))}
                        </ul>
                        <p>
                            <span className="font-bold">{t('experience.technologies')}:</span>
                        </p>
                        <p className="ml-4">{project.technologies.join(', ')}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default Projects;
