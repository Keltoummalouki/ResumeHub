import CVHeader from "@/components/CVHeader";
import CVSection from "@/components/CVSection";
import TechnicalSkills from "@/components/TechnicalSkills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Additional from "@/components/Additional";
import DownloadButtons from "@/components/DownloadButtons";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <DownloadButtons />
        <div id="cv-content" className="bg-card shadow-lg">
          <div className="p-6 sm:p-8">
            <CVHeader />
          
          <CVSection title="Compétences Techniques">
            <TechnicalSkills />
          </CVSection>

          <CVSection title="Expériences Professionnelles">
            <Experience />
          </CVSection>

          <CVSection title="Éducation">
            <Education />
          </CVSection>

          <CVSection title="Projets Réalisés">
            <Projects />
          </CVSection>

          <CVSection title="Certifications">
            <Additional />
          </CVSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;