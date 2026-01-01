import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
    CVStore,
    CVData,
    CVSettings,
    PersonalInfo,
    TechnicalSkills,
    ExperienceEntry,
    EducationEntry,
    ProjectEntry,
    LanguageEntry,
    CertificationEntry,
    TemplateType,
    ThemeMode
} from '@/types/cv';
import { defaultCV, defaultSettings } from '@/data/defaultCV';

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useCVStore = create<CVStore>()(
    persist(
        (set, get) => ({
            cv: defaultCV,
            settings: defaultSettings,

            // Personal Info
            updatePersonalInfo: (info: Partial<PersonalInfo>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        personalInfo: { ...state.cv.personalInfo, ...info },
                    },
                })),

            // Skills
            updateSkills: (skills: Partial<TechnicalSkills>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        skills: { ...state.cv.skills, ...skills },
                    },
                })),

            // Experience
            addExperience: (experience: Omit<ExperienceEntry, 'id'>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        experience: [
                            ...state.cv.experience,
                            { ...experience, id: generateId() },
                        ],
                    },
                })),

            updateExperience: (id: string, experience: Partial<ExperienceEntry>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        experience: state.cv.experience.map((exp) =>
                            exp.id === id ? { ...exp, ...experience } : exp
                        ),
                    },
                })),

            removeExperience: (id: string) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        experience: state.cv.experience.filter((exp) => exp.id !== id),
                    },
                })),

            // Education
            addEducation: (education: Omit<EducationEntry, 'id'>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        education: [
                            ...state.cv.education,
                            { ...education, id: generateId() },
                        ],
                    },
                })),

            updateEducation: (id: string, education: Partial<EducationEntry>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        education: state.cv.education.map((edu) =>
                            edu.id === id ? { ...edu, ...education } : edu
                        ),
                    },
                })),

            removeEducation: (id: string) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        education: state.cv.education.filter((edu) => edu.id !== id),
                    },
                })),

            // Projects
            addProject: (project: Omit<ProjectEntry, 'id'>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        projects: [
                            ...state.cv.projects,
                            { ...project, id: generateId() },
                        ],
                    },
                })),

            updateProject: (id: string, project: Partial<ProjectEntry>) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        projects: state.cv.projects.map((proj) =>
                            proj.id === id ? { ...proj, ...project } : proj
                        ),
                    },
                })),

            removeProject: (id: string) =>
                set((state) => ({
                    cv: {
                        ...state.cv,
                        projects: state.cv.projects.filter((proj) => proj.id !== id),
                    },
                })),

            // Other data
            updateCertifications: (certifications: CertificationEntry[]) =>
                set((state) => ({
                    cv: { ...state.cv, certifications },
                })),

            updateSoftSkills: (softSkills: string[]) =>
                set((state) => ({
                    cv: { ...state.cv, softSkills },
                })),

            updateLanguages: (languages: LanguageEntry[]) =>
                set((state) => ({
                    cv: { ...state.cv, languages },
                })),

            // Settings
            updateSettings: (settings: Partial<CVSettings>) =>
                set((state) => ({
                    settings: { ...state.settings, ...settings },
                })),

            setTemplate: (templateId: TemplateType) =>
                set((state) => ({
                    settings: { ...state.settings, templateId },
                })),

            setTheme: (themeMode: ThemeMode) =>
                set((state) => ({
                    settings: { ...state.settings, themeMode },
                })),

            // Import/Export
            importCV: (data: CVData) =>
                set(() => ({
                    cv: data,
                })),

            resetCV: () =>
                set(() => ({
                    cv: defaultCV,
                    settings: defaultSettings,
                })),
        }),
        {
            name: 'resumehub-storage',
            version: 1,
        }
    )
);
