import { CVData, CVSettings } from '@/types/cv';

export const defaultSettings: CVSettings = {
    templateId: 'classic',
    themeMode: 'light',
    accentColor: '#000000',
    language: 'fr',
    showPhoto: true,
};

export const defaultCV: CVData = {
    personalInfo: {
        name: 'Keltoum Malouki',
        title: 'Développeuse Web Full Stack',
        phone: '+212 606232697',
        email: 'keltoummalouki@gmail.com',
        address: 'Casablanca (mobilité)',
        github: 'keltoummalouki',
        linkedin: 'keltoummalouki',
        portfolio: 'keltoummalouki.com',
    },
    skills: {
        languages: ['C', 'HTML5', 'CSS3', 'SQL', 'NoSQL', 'JavaScript', 'TypeScript', 'PHP'],
        frameworks: ['Laravel', 'Node.js', 'React', 'Next.js', 'Express.js', 'NestJS', 'Tailwind CSS', 'GraphQL'],
        databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
        devops: ['Docker', 'CI/CD (GitHub Actions, GitLab)', 'Tests automatisés'],
        projectManagement: ['Méthodes agiles', 'Jira'],
        design: ['Figma', 'Canva', 'Adobe XD'],
        versionControl: ['Git', 'GitHub', 'GitLab'],
        modeling: ['Merise', 'UML'],
    },
    experience: [
        {
            id: '1',
            role: 'Stagiaire Développeuse Web',
            company: 'Caisse Manager',
            location: 'Rabat',
            startDate: 'Juin',
            endDate: 'Août 2025',
            tasks: [
                "Développement d'un site vitrine officiel",
                'Réalisation de maquettes et intégration front-end avec React, Next.js et Tailwind CSS.',
                "Mise en place d'animations web interactives.",
            ],
            technologies: ['Next.js', 'React.js', 'TailwindCSS', 'GSAP', 'Framer Motion', 'Shadcn UI', 'Git/GitHub'],
        },
    ],
    education: [
        {
            id: '1',
            degree: 'Formation Développement Full Stack YouCode - UM6P, Campus Youssoufia',
            institution: 'YouCode - UM6P',
            endDate: '2024- Présent',
            description: 'Formation pratique en développement web front-end et back-end',
        },
        {
            id: '2',
            degree: 'Baccalauréat en Sciences physiques et chimiques',
            institution: 'Lycée Okba Bnou Nafiaa',
            location: 'Casablanca',
            endDate: '2023 - 2024',
        },
    ],
    projects: [
        {
            id: '1',
            name: 'TruckFlow',
            date: 'Décembre 2025',
            description: "Développement d'une solution de gestion de flotte routière permettant de :",
            highlights: [
                "Gérer le parc automobile (camions, remorques), les chauffeurs et l'assignation des trajets",
                'Suivre la maintenance préventive, la consommation et générer les ordres de mission (PDF)',
            ],
            technologies: ['React.js', 'Redux', 'Node.js', 'Express.js', 'MongoDB', 'Docker'],
            link: 'https://github.com/Keltoummalouki/TruckFlow',
        },
        {
            id: '2',
            name: 'Réservez-Moi',
            date: 'Avril 2025',
            description: "Développement d'un système permettant aux utilisateurs de :",
            highlights: [
                'Réserver facilement des services dans plusieurs secteurs (ex : beauté, réparation, etc.)',
                'Consulter les disponibilités et gérer leurs réservations',
            ],
            technologies: ['Laravel', 'MySQL', 'HTML', 'Tailwind CSS', 'JavaScript', 'UML', 'Jira', 'Git/GitHub'],
            link: 'https://github.com/Keltoummalouki/Reservez-Moi',
        },
    ],
    certifications: [
        {
            name: 'Docker Foundations Professional LinkedIn Certificate',
            link: 'https://www.linkedin.com/learning/certificates/8556c209c6898f55066429ef88fa4d13bed6d4bdb38b594b6d7dbc02216898b2?trk=share_certificate',
        },
    ],
    softSkills: ['Gestion du temps', 'Adaptabilité - Flexibilité', 'Travail en équipe'],
    languages: [
        { name: 'Arabe', level: 'native' },
        { name: 'Français', level: 'intermediate', code: 'B1' },
        { name: 'Anglais', level: 'beginner', code: 'A2' },
    ],
};
