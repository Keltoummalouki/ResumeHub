import { useTranslation } from 'react-i18next';

interface CVSectionProps {
  title: string;
  translationKey?: string;
  children: React.ReactNode;
  className?: string;
}

const CVSection = ({ title, translationKey, children, className = "" }: CVSectionProps) => {
  const { t } = useTranslation();

  const displayTitle = translationKey ? t(translationKey) : title;

  return (
    <section className={`mb-3 cv-section ${className}`}>
      <div className="border-t-2 border-black pt-2 mb-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-black">{displayTitle}</h3>
      </div>
      {children}
    </section>
  );
};

export default CVSection;