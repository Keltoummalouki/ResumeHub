import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CVHeader from '@/components/CVHeader';
import CVSection from '@/components/CVSection';
import TechnicalSkills from '@/components/TechnicalSkills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Additional from '@/components/Additional';

const EditorPage = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 print:py-0 print:px-0">
                <div className="max-w-[210mm] mx-auto">
                    <div
                        id="cv-content"
                        className="bg-white text-black shadow-lg print:shadow-none"
                        style={{ minHeight: '297mm' }}
                    >
                        <div className="p-8 print:p-[15mm]">
                            <CVHeader />

                            <CVSection title="Compétences Techniques" translationKey="sections.technicalSkills">
                                <TechnicalSkills />
                            </CVSection>

                            <CVSection title="Expériences Professionnelles" translationKey="sections.experience">
                                <Experience />
                            </CVSection>

                            <CVSection title="Éducation" translationKey="sections.education">
                                <Education />
                            </CVSection>

                            <CVSection title="Projets Réalisés" translationKey="sections.projects">
                                <Projects />
                            </CVSection>

                            <CVSection title="Certifications" translationKey="sections.certifications">
                                <Additional />
                            </CVSection>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EditorPage;
