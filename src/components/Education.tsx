import { useTranslation } from 'react-i18next';
import { useCVStore } from '@/store/cvStore';

const Education = () => {
  const { t } = useTranslation();
  const { education } = useCVStore((state) => state.cv);

  // Get translated education content
  const getTranslatedEducation = (eduId: string) => {
    if (eduId === '1') {
      return {
        degree: t('cv.education.youcode.degree'),
        description: t('cv.education.youcode.description'),
      };
    }
    if (eduId === '2') {
      return {
        degree: t('cv.education.bac.degree'),
        location: t('cv.education.bac.location'),
      };
    }
    return null;
  };

  return (
    <div className="space-y-2 text-[11px] leading-relaxed text-black">
      {education.map((edu) => {
        const translated = getTranslatedEducation(edu.id);

        return (
          <div key={edu.id}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold">{translated?.degree || edu.degree}</h4>
                <p>
                  {translated?.description || edu.description || translated?.location || edu.institution}
                  {!translated?.description && !edu.description && edu.location && ` – ${edu.location}.`}
                </p>
              </div>
              <span className="font-bold whitespace-nowrap ml-4">{edu.endDate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Education;
