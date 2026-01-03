import Dexie, { Table } from 'dexie';

// ============= Type Definitions =============

export interface Profile {
    id: string;
    name: string;
    title: string;
    email: string;
    phone: string;
    address: string;
    github: string;
    linkedin: string;
    portfolio: string;
    profileImage?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    tasks: string[];
    technologies: string[];
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Project {
    id: string;
    name: string;
    date: string;
    description: string;
    highlights: string[];
    technologies: string[];
    link?: string;
    isFeatured: boolean;
    isVisible: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Skill {
    id: string;
    name: string;
    category: 'languages' | 'frameworks' | 'databases' | 'devops' | 'design' | 'projectManagement' | 'versionControl' | 'modeling';
    level: number; // 1-5
    yearsOfExperience?: number;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate?: string;
    endDate: string;
    description?: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date?: string;
    link?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CVVariant {
    id: string;
    name: string;
    language: 'fr' | 'en' | 'ar';
    template: 'classic' | 'modern' | 'minimal';
    selectedExperienceIds: string[];
    selectedProjectIds: string[];
    selectedSkillIds: string[];
    selectedEducationIds: string[];
    selectedCertificationIds: string[];
    accentColor?: string;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastExportedAt?: Date;
}

export interface AppSettings {
    id: string;
    themeMode: 'light' | 'dark' | 'system';
    language: 'fr' | 'en' | 'ar';
    defaultTemplateId: string;
    showPhoto: boolean;
}

export interface ActivityLog {
    id: string;
    action: string;
    entityType: string;
    entityId?: string;
    timestamp: Date;
}

// ============= Database Class =============

class CareerDatabase extends Dexie {
    profile!: Table<Profile>;
    experiences!: Table<Experience>;
    projects!: Table<Project>;
    skills!: Table<Skill>;
    education!: Table<Education>;
    certifications!: Table<Certification>;
    cvVariants!: Table<CVVariant>;
    settings!: Table<AppSettings>;
    activityLog!: Table<ActivityLog>;

    constructor() {
        super('ResumeHubDB');

        this.version(1).stores({
            profile: 'id, name, email',
            experiences: 'id, company, order, isVisible',
            projects: 'id, name, order, isFeatured, isVisible',
            skills: 'id, name, category, isVisible',
            education: 'id, institution, order',
            certifications: 'id, name',
            cvVariants: 'id, name, isDefault',
            settings: 'id',
            activityLog: 'id, timestamp, entityType',
        });
    }
}

// ============= Database Instance =============

export const db = new CareerDatabase();

// ============= Helper Functions =============

export const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const logActivity = async (action: string, entityType: string, entityId?: string) => {
    await db.activityLog.add({
        id: generateId(),
        action,
        entityType,
        entityId,
        timestamp: new Date(),
    });
};

// ============= Initialize Default Data =============

export const initializeDatabase = async () => {
    // Check if profile exists
    const profileCount = await db.profile.count();

    if (profileCount === 0) {
        // Create default profile
        await db.profile.add({
            id: 'default',
            name: 'Keltoum Malouki',
            title: 'Développeuse Web Full Stack',
            email: 'keltoummalouki@gmail.com',
            phone: '+212 606 232 697',
            address: 'Casablanca',
            github: 'keltoummalouki',
            linkedin: 'keltoummalouki',
            portfolio: 'keltoummalouki.com',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Create default experience
        await db.experiences.add({
            id: generateId(),
            role: 'Stagiaire Développeuse Web',
            company: 'Caisse Manager',
            location: 'Rabat',
            startDate: 'Juin 2025',
            endDate: 'Août 2025',
            tasks: [
                'Développement d\'un site vitrine officiel',
                'Réalisation de maquettes et intégration front-end avec React, Next.js et Tailwind CSS',
                'Mise en place d\'animations web interactives',
            ],
            technologies: ['Next.js', 'React.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Shadcn UI', 'Git', 'GitHub'],
            isVisible: true,
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Create default projects
        await db.projects.bulkAdd([
            {
                id: generateId(),
                name: 'TruckFlow',
                date: 'Décembre 2025',
                description: 'Développement d\'une solution de gestion de flotte routière permettant de :',
                highlights: [
                    'Gérer le parc automobile (camions, remorques), les chauffeurs et l\'assignation des trajets',
                    'Suivre la maintenance préventive, la consommation et générer les ordres de mission (PDF)',
                ],
                technologies: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Docker'],
                link: 'https://github.com/keltoummalouki/TruckFlow',
                isFeatured: true,
                isVisible: true,
                order: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: generateId(),
                name: 'Réservez-Moi',
                date: 'Avril 2025',
                description: 'Développement d\'un système permettant aux utilisateurs de :',
                highlights: [
                    'Réserver facilement des services dans plusieurs secteurs (ex : beauté, réparation, etc.)',
                    'Consulter les disponibilités et gérer leurs réservations',
                ],
                technologies: ['Laravel', 'MySQL', 'HTML', 'Tailwind CSS', 'JavaScript', 'UML', 'Jira', 'Git', 'GitHub'],
                link: 'https://github.com/keltoummalouki/Reservez-Moi',
                isFeatured: true,
                isVisible: true,
                order: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Create default education
        await db.education.bulkAdd([
            {
                id: generateId(),
                degree: 'Formation Développement Full Stack YouCode - UM6P, Campus Youssoufia',
                institution: 'YouCode - UM6P',
                location: 'Youssoufia',
                endDate: '2024 – Présent',
                description: 'Formation pratique en développement web front-end et back-end',
                order: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: generateId(),
                degree: 'Baccalauréat en Sciences physiques et chimiques',
                institution: 'Lycée Okba Bnou Nafiaa',
                location: 'Casablanca',
                endDate: '2023 – 2024',
                order: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        // Create default certifications
        await db.certifications.add({
            id: generateId(),
            name: 'Docker Foundations Professional LinkedIn Certificate',
            issuer: 'LinkedIn',
            link: 'https://www.linkedin.com/learning/certificates/docker-foundations',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Create default skills
        const skillsData = [
            // Languages
            { name: 'C', category: 'languages' as const },
            { name: 'HTML5', category: 'languages' as const },
            { name: 'CSS3', category: 'languages' as const },
            { name: 'JavaScript', category: 'languages' as const },
            { name: 'TypeScript', category: 'languages' as const },
            { name: 'PHP', category: 'languages' as const },
            { name: 'SQL', category: 'languages' as const },
            { name: 'NoSQL', category: 'languages' as const },
            // Frameworks
            { name: 'React.js', category: 'frameworks' as const },
            { name: 'Next.js', category: 'frameworks' as const },
            { name: 'Laravel', category: 'frameworks' as const },
            { name: 'Node.js', category: 'frameworks' as const },
            { name: 'Express.js', category: 'frameworks' as const },
            { name: 'NestJS', category: 'frameworks' as const },
            { name: 'Tailwind CSS', category: 'frameworks' as const },
            { name: 'GraphQL', category: 'frameworks' as const },
            // Databases
            { name: 'MySQL', category: 'databases' as const },
            { name: 'PostgreSQL', category: 'databases' as const },
            { name: 'MongoDB', category: 'databases' as const },
            // DevOps
            { name: 'Docker', category: 'devops' as const },
            { name: 'CI/CD (GitHub Actions, GitLab)', category: 'devops' as const },
            { name: 'Tests automatisés', category: 'devops' as const },
            // Project Management
            { name: 'Méthodologies agiles', category: 'projectManagement' as const },
            { name: 'Jira', category: 'projectManagement' as const },
            // Version Control
            { name: 'Git', category: 'versionControl' as const },
            { name: 'GitHub', category: 'versionControl' as const },
            { name: 'GitLab', category: 'versionControl' as const },
            // Modeling
            { name: 'UML', category: 'modeling' as const },
            { name: 'Merise', category: 'modeling' as const },
            // Design
            { name: 'Figma', category: 'design' as const },
            { name: 'Canva', category: 'design' as const },
            { name: 'Adobe XD', category: 'design' as const },
        ];

        await db.skills.bulkAdd(
            skillsData.map((skill) => ({
                id: generateId(),
                ...skill,
                level: 4,
                isVisible: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))
        );

        // Create default CV variant
        const allExperiences = await db.experiences.toArray();
        const allProjects = await db.projects.toArray();
        const allSkills = await db.skills.toArray();
        const allEducation = await db.education.toArray();
        const allCertifications = await db.certifications.toArray();

        await db.cvVariants.add({
            id: generateId(),
            name: 'CV Principal',
            language: 'fr',
            template: 'classic',
            selectedExperienceIds: allExperiences.map((e) => e.id),
            selectedProjectIds: allProjects.map((p) => p.id),
            selectedSkillIds: allSkills.map((s) => s.id),
            selectedEducationIds: allEducation.map((e) => e.id),
            selectedCertificationIds: allCertifications.map((c) => c.id),
            isDefault: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Create default settings
        await db.settings.add({
            id: 'default',
            themeMode: 'system',
            language: 'fr',
            defaultTemplateId: 'classic',
            showPhoto: true,
        });

        await logActivity('Database initialized', 'system');
    }
};

// Initialize on import
initializeDatabase().catch(console.error);

export default db;
