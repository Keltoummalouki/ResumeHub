import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';

const TechnicalSkills = () => {
  const { t } = useTranslation();
  const { skills } = useCVStore((state) => state.cv);

  const formatArray = (arr: string[]) => arr.join(', ') + '.';

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[11px] leading-relaxed text-black">
      <div>
        <p className="mb-0.5">
          <span className="font-bold">{t('skills.languages')}:</span> {formatArray(skills.languages)}
        </p>
        <p className="mb-0.5">
          <span className="font-bold">{t('skills.frameworks')}:</span> {formatArray(skills.frameworks)}
        </p>
        <p>
          <span className="font-bold">{t('skills.devops')}:</span> {formatArray(skills.devops)}
        </p>
      </div>
      <div>
        <p className="mb-0.5">
          <span className="font-bold">{t('skills.databases')}:</span> {formatArray(skills.databases)}
        </p>
        <p className="mb-0.5">
          <span className="font-bold">{t('skills.projectManagement')}:</span> {formatArray(skills.projectManagement)}
        </p>
        <p className="mb-0.5">
          <span className="font-bold">{t('skills.modeling')}:</span> {formatArray(skills.modeling)}
        </p>
        <p className="mb-0.5">
          <span className="font-bold">{t('skills.versionControl')}:</span> {formatArray(skills.versionControl)}
        </p>
        <p>
          <span className="font-bold">{t('skills.design')}:</span> {formatArray(skills.design)}
        </p>
      </div>
    </div>
  );
};

export default TechnicalSkills;
