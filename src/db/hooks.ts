import { useLiveQuery } from 'dexie-react-hooks';
import { db, generateId, logActivity, Profile, Experience, Project, Skill, Education, Certification, CVVariant, AppSettings } from './database';

// ============= Profile Hooks =============

export const useProfile = () => {
    const profile = useLiveQuery(() => db.profile.get('default'));

    const updateProfile = async (data: Partial<Profile>) => {
        await db.profile.update('default', {
            ...data,
            updatedAt: new Date(),
        });
        await logActivity('Updated profile', 'profile', 'default');
    };

    return { profile, updateProfile };
};

// ============= Experience Hooks =============

export const useExperiences = () => {
    const experiences = useLiveQuery(() =>
        db.experiences.orderBy('order').toArray()
    );

    const addExperience = async (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'isVisible'>) => {
        const order = (experiences?.length || 0);
        const id = generateId();
        await db.experiences.add({
            ...data,
            id,
            order,
            isVisible: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await logActivity('Added experience', 'experience', id);
        return id;
    };

    const updateExperience = async (id: string, data: Partial<Experience>) => {
        await db.experiences.update(id, {
            ...data,
            updatedAt: new Date(),
        });
        await logActivity('Updated experience', 'experience', id);
    };

    const removeExperience = async (id: string) => {
        await db.experiences.delete(id);
        await logActivity('Removed experience', 'experience', id);
    };

    const reorderExperiences = async (ids: string[]) => {
        await db.transaction('rw', db.experiences, async () => {
            for (let i = 0; i < ids.length; i++) {
                await db.experiences.update(ids[i], { order: i });
            }
        });
        await logActivity('Reordered experiences', 'experience');
    };

    return { experiences, addExperience, updateExperience, removeExperience, reorderExperiences };
};

// ============= Projects Hooks =============

export const useProjects = () => {
    const projects = useLiveQuery(() =>
        db.projects.orderBy('order').toArray()
    );

    const addProject = async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'order' | 'isVisible' | 'isFeatured'>) => {
        const order = (projects?.length || 0);
        const id = generateId();
        await db.projects.add({
            ...data,
            id,
            order,
            isVisible: true,
            isFeatured: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await logActivity('Added project', 'project', id);
        return id;
    };

    const updateProject = async (id: string, data: Partial<Project>) => {
        await db.projects.update(id, {
            ...data,
            updatedAt: new Date(),
        });
        await logActivity('Updated project', 'project', id);
    };

    const removeProject = async (id: string) => {
        await db.projects.delete(id);
        await logActivity('Removed project', 'project', id);
    };

    const toggleFeatured = async (id: string) => {
        const project = await db.projects.get(id);
        if (project) {
            await db.projects.update(id, { isFeatured: !project.isFeatured });
        }
    };

    return { projects, addProject, updateProject, removeProject, toggleFeatured };
};

// ============= Skills Hooks =============

export const useSkills = () => {
    const skills = useLiveQuery(() => db.skills.toArray());

    const skillsByCategory = useLiveQuery(async () => {
        const allSkills = await db.skills.toArray();
        return allSkills.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {} as Record<string, Skill[]>);
    });

    const addSkill = async (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'isVisible'>) => {
        const id = generateId();
        await db.skills.add({
            ...data,
            id,
            isVisible: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await logActivity('Added skill', 'skill', id);
        return id;
    };

    const removeSkill = async (id: string) => {
        await db.skills.delete(id);
        await logActivity('Removed skill', 'skill', id);
    };

    const updateSkillLevel = async (id: string, level: number) => {
        await db.skills.update(id, { level, updatedAt: new Date() });
    };

    return { skills, skillsByCategory, addSkill, removeSkill, updateSkillLevel };
};

// ============= Education Hooks =============

export const useEducation = () => {
    const education = useLiveQuery(() =>
        db.education.orderBy('order').toArray()
    );

    const addEducation = async (data: Omit<Education, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
        const order = (education?.length || 0);
        const id = generateId();
        await db.education.add({
            ...data,
            id,
            order,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await logActivity('Added education', 'education', id);
        return id;
    };

    const updateEducation = async (id: string, data: Partial<Education>) => {
        await db.education.update(id, {
            ...data,
            updatedAt: new Date(),
        });
        await logActivity('Updated education', 'education', id);
    };

    const removeEducation = async (id: string) => {
        await db.education.delete(id);
        await logActivity('Removed education', 'education', id);
    };

    return { education, addEducation, updateEducation, removeEducation };
};

// ============= Certifications Hooks =============

export const useCertifications = () => {
    const certifications = useLiveQuery(() => db.certifications.toArray());

    const addCertification = async (data: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>) => {
        const id = generateId();
        await db.certifications.add({
            ...data,
            id,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await logActivity('Added certification', 'certification', id);
        return id;
    };

    const removeCertification = async (id: string) => {
        await db.certifications.delete(id);
        await logActivity('Removed certification', 'certification', id);
    };

    return { certifications, addCertification, removeCertification };
};

// ============= CV Variants Hooks =============

export const useCVVariants = () => {
    const variants = useLiveQuery(() => db.cvVariants.toArray());
    const defaultVariant = useLiveQuery(() =>
        db.cvVariants.filter(v => v.isDefault).first()
    );

    const addVariant = async (data: Omit<CVVariant, 'id' | 'createdAt' | 'updatedAt' | 'isDefault'>) => {
        const id = generateId();
        await db.cvVariants.add({
            ...data,
            id,
            isDefault: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        await logActivity('Created CV variant', 'cvVariant', id);
        return id;
    };

    const updateVariant = async (id: string, data: Partial<CVVariant>) => {
        await db.cvVariants.update(id, {
            ...data,
            updatedAt: new Date(),
        });
        await logActivity('Updated CV variant', 'cvVariant', id);
    };

    const removeVariant = async (id: string) => {
        const variant = await db.cvVariants.get(id);
        if (variant?.isDefault) {
            throw new Error('Cannot delete default CV variant');
        }
        await db.cvVariants.delete(id);
        await logActivity('Removed CV variant', 'cvVariant', id);
    };

    const setDefault = async (id: string) => {
        await db.transaction('rw', db.cvVariants, async () => {
            // Unset current default
            await db.cvVariants.where('isDefault').equals(1).modify({ isDefault: false });
            // Set new default
            await db.cvVariants.update(id, { isDefault: true });
        });
        await logActivity('Set default CV variant', 'cvVariant', id);
    };

    const markExported = async (id: string) => {
        await db.cvVariants.update(id, { lastExportedAt: new Date() });
        await logActivity('Exported CV', 'cvVariant', id);
    };

    return { variants, defaultVariant, addVariant, updateVariant, removeVariant, setDefault, markExported };
};

// ============= Settings Hooks =============

export const useSettings = () => {
    const settings = useLiveQuery(() => db.settings.get('default'));

    const updateSettings = async (data: Partial<AppSettings>) => {
        await db.settings.update('default', data);
        await logActivity('Updated settings', 'settings');
    };

    return { settings, updateSettings };
};

// ============= Activity Log Hooks =============

export const useActivityLog = (limit = 10) => {
    const activities = useLiveQuery(() =>
        db.activityLog.orderBy('timestamp').reverse().limit(limit).toArray()
    );

    return { activities };
};

// ============= Stats Hooks =============

export const useCareerStats = () => {
    return useLiveQuery(async () => {
        const [profile, experiences, projects, skills, education, certifications, variants] = await Promise.all([
            db.profile.get('default'),
            db.experiences.count(),
            db.projects.count(),
            db.skills.count(),
            db.education.count(),
            db.certifications.count(),
            db.cvVariants.count(),
        ]);

        // Calculate completion percentage
        let completion = 0;
        if (profile?.name) completion += 15;
        if (profile?.email) completion += 10;
        if (profile?.phone) completion += 5;
        if (profile?.github) completion += 5;
        if (profile?.linkedin) completion += 5;
        if (experiences > 0) completion += 20;
        if (projects > 0) completion += 15;
        if (skills > 0) completion += 15;
        if (education > 0) completion += 10;

        return {
            profileComplete: Math.min(completion, 100),
            experienceCount: experiences,
            projectCount: projects,
            skillCount: skills,
            educationCount: education,
            certificationCount: certifications,
            cvVariantCount: variants,
        };
    });
};
