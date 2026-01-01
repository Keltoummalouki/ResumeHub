import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';

const Additional = () => {
    const { t } = useTranslation();
    const { certifications } = useCVStore((state) => state.cv);

    // Get translated soft skills
    const translatedSoftSkills = [
        t('cv.softSkills.timeManagement'),
        t('cv.softSkills.adaptability'),
        t('cv.softSkills.teamwork'),
    ];

    // Get translated language levels
    const translatedLanguages = [
        t('cv.languageLevels.arabic'),
        t('cv.languageLevels.french'),
        t('cv.languageLevels.english'),
    ];

    return (
        <div className="space-y-2 text-[11px] leading-relaxed text-black">
            <div>
                <p>
                    <span className="font-bold">{t('sections.certifications')}:</span>{' '}
                    {certifications.map((cert, index) => (
                        <span key={index}>
                            {cert.link ? (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black no-underline hover:underline"
                                >
                                    {t('cv.certifications.docker')}
                                </a>
                            ) : (
                                t('cv.certifications.docker')
                            )}
                            {index < certifications.length - 1 && ', '}
                        </span>
                    ))}
                </p>
            </div>

            <div className="border-t-2 border-black pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-black">
                    {t('sections.softSkills')}
                </h3>
                <div className="flex justify-between">
                    {translatedSoftSkills.map((skill, index) => (
                        <span key={index}>{skill}</span>
                    ))}
                </div>
            </div>

            <div className="border-t-2 border-black pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wide mb-1 text-black">
                    {t('sections.languages')}
                </h3>
                <div className="flex justify-between">
                    {translatedLanguages.map((lang, index) => (
                        <span key={index}>{lang}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Additional;
