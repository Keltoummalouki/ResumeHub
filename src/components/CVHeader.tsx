import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';
import profileImage from '@/assets/profile.png';

const CVHeader = () => {
    const { t } = useTranslation();
    const { personalInfo } = useCVStore((state) => state.cv);
    const { showPhoto } = useCVStore((state) => state.settings);

    return (
        <header className="mb-4 cv-section">
            <div className="flex items-start justify-between gap-6 mb-3">
                <div className="flex-1">
                    <h1 className="text-2xl font-extrabold uppercase tracking-tight mb-0.5 text-black">
                        {t('cv.profile.title')}
                    </h1>
                    <h2 className="text-xl font-bold uppercase tracking-wide text-black">
                        {personalInfo.name}
                    </h2>
                </div>
                {showPhoto && (
                    <div className="flex-shrink-0">
                        <img
                            src={personalInfo.profileImage || profileImage}
                            alt={personalInfo.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-black"
                        />
                    </div>
                )}
            </div>

            <div className="border-t-2 border-black pt-2 pb-2">
                <div className="text-[11px] leading-relaxed text-black">
                    <p className="mb-0.5">
                        <span className="font-bold">{t('header.phone')}:</span> {personalInfo.phone} |{' '}
                        <span className="font-bold">{t('header.email')}:</span>{' '}
                        <a href={`mailto:${personalInfo.email}`} className="text-black no-underline hover:underline">
                            {personalInfo.email}
                        </a>{' '}
                        |{' '}
                        <span className="font-bold">{t('header.address')}:</span> {t('cv.profile.location')}
                    </p>
                    <p>
                        <span className="font-bold">{t('header.github')}:</span>{' '}
                        <a
                            href={`https://github.com/${personalInfo.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black no-underline hover:underline"
                        >
                            {personalInfo.github}
                        </a>{' '}
                        |{' '}
                        <span className="font-bold">{t('header.linkedin')}:</span>{' '}
                        <a
                            href={`https://linkedin.com/in/${personalInfo.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black no-underline hover:underline"
                        >
                            {personalInfo.linkedin}
                        </a>{' '}
                        |{' '}
                        <span className="font-bold">{t('header.portfolio')}:</span>{' '}
                        <a
                            href={`https://${personalInfo.portfolio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black no-underline hover:underline"
                        >
                            {personalInfo.portfolio}
                        </a>
                    </p>
                </div>
            </div>
        </header>
    );
};

export default CVHeader;
