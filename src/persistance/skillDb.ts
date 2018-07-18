import { Skill as SkillDomain } from '../domain';
import { SkillModel } from '../schemas';

export const getSkills = async (): Promise<SkillDomain[]> => {
    try {
        return await SkillModel
            .find({})
            .sort({ level: 'desc' });
    } catch (err) {
        throw err;
    }
};
