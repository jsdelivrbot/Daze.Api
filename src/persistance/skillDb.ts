import { SkillDomain } from '../domain';
import { SkillModel } from '../schemas';

export const getSkills = async (): Promise<SkillDomain[]> => {
    return await SkillModel
        .find({})
        .sort({ level: 'desc' });
};
