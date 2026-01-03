import { ReactNode } from 'react';
import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import { Profile, Experience, Project, Skill, Education, Certification } from '@/db/database';

export interface CVData {
    profile: Profile;
    experiences: Experience[];
    projects: Project[];
    skills: Skill[];
    education: Education[];
    certifications: Certification[];
}

export interface TemplateProps {
    data: CVData;
    language: 'fr' | 'en' | 'ar';
    accentColor?: string;
}

type TemplateType = 'classic' | 'modern' | 'minimal';

interface TemplateRendererProps {
    template: TemplateType;
    data: CVData;
    language?: 'fr' | 'en' | 'ar';
    accentColor?: string;
}

const TemplateRenderer = ({
    template,
    data,
    language = 'fr',
    accentColor
}: TemplateRendererProps): ReactNode => {
    const templateProps: TemplateProps = {
        data,
        language,
        accentColor,
    };

    switch (template) {
        case 'modern':
            return <ModernTemplate {...templateProps} />;
        case 'minimal':
            return <MinimalTemplate {...templateProps} />;
        case 'classic':
        default:
            return <ClassicTemplate {...templateProps} />;
    }
};

export default TemplateRenderer;
