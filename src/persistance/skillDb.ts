import { SkillDomain } from '../domain';
import { SkillModel } from '../schemas';

export const getSkills = async (): Promise<SkillDomain[]> => {
    return await SkillModel
        .find({})
        .sort({ level: 'desc' });
};

export const createSkill = async (payload: SkillDomain): Promise<SkillDomain> => {
    return await new SkillModel(payload)
        .save();
};
