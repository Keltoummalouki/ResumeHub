import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';

const Experience = () => {
  const { t } = useTranslation();
  const { experience } = useCVStore((state) => state.cv);

  // Get translated tasks for the experience entry
  const getTranslatedTasks = (expId: string): string[] => {
    if (expId === '1') {
      return t('cv.experience.webDevIntern.tasks', { returnObjects: true }) as string[];
    }
    return experience.find(e => e.id === expId)?.tasks || [];
  };

  const getTranslatedRole = (expId: string, defaultRole: string): string => {
    if (expId === '1') {
      return t('cv.experience.webDevIntern.role');
    }
    return defaultRole;
  };

  return (
    <div className="space-y-2 text-[11px] leading-relaxed text-black">
      {experience.map((exp) => (
        <div key={exp.id}>
          <div className="flex justify-between items-start mb-0.5">
            <h4 className="font-bold">
              {getTranslatedRole(exp.id, exp.role)} – {exp.company}, {exp.location}
            </h4>
            <span className="font-bold whitespace-nowrap ml-4">
              {exp.startDate} – {exp.endDate}
            </span>
          </div>
          <ul className="list-disc ml-4 space-y-0.5 mb-1">
            {getTranslatedTasks(exp.id).map((task, index) => (
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
  );
};

export default Experience;
