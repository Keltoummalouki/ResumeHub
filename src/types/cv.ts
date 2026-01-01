// CV Data Types
export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  github: string;
  linkedin: string;
  portfolio: string;
  profileImage?: string;
}

export interface TechnicalSkills {
  languages: string[];
  frameworks: string[];
  databases: string[];
  devops: string[];
  projectManagement: string[];
  design: string[];
  versionControl: string[];
  modeling: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  tasks: string[];
  technologies: string[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate?: string;
  endDate: string;
  description?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  date: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

export interface LanguageEntry {
  name: string;
  level: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'beginner';
  code?: string;
}

export interface CertificationEntry {
  name: string;
  link?: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  skills: TechnicalSkills;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: ProjectEntry[];
  certifications: CertificationEntry[];
  softSkills: string[];
  languages: LanguageEntry[];
}

// Settings Types
export type TemplateType = 'classic' | 'modern' | 'minimal';
export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'fr' | 'en' | 'ar';

export interface CVSettings {
  templateId: TemplateType;
  themeMode: ThemeMode;
  accentColor: string;
  language: Language;
  showPhoto: boolean;
}

// Store Types
export interface CVStore {
  cv: CVData;
  settings: CVSettings;

  // CV Data Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSkills: (skills: Partial<TechnicalSkills>) => void;

  // Experience Actions
  addExperience: (experience: Omit<ExperienceEntry, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;

  // Education Actions
  addEducation: (education: Omit<EducationEntry, 'id'>) => void;
  updateEducation: (id: string, education: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  // Project Actions
  addProject: (project: Omit<ProjectEntry, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;

  // Other Actions
  updateCertifications: (certifications: CertificationEntry[]) => void;
  updateSoftSkills: (softSkills: string[]) => void;
  updateLanguages: (languages: LanguageEntry[]) => void;

  // Settings Actions
  updateSettings: (settings: Partial<CVSettings>) => void;
  setTemplate: (templateId: TemplateType) => void;
  setTheme: (theme: ThemeMode) => void;

  // Import/Export Actions
  importCV: (data: CVData) => void;
  resetCV: () => void;
}
