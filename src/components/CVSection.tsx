interface CVSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const CVSection = ({ title, children, className = "" }: CVSectionProps) => {
  return (
    <section className={`mb-4 ${className}`}>
      <div className="border-t-2 border-divider pt-2 mb-3">
        <h3 className="text-base font-bold uppercase tracking-wide">{title}</h3>
      </div>
      {children}
    </section>
  );
};

export default CVSection;