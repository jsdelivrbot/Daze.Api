import { ProjectDomain } from "../domain";
import { ProjectModel } from "../schemas";

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getProjects = async (offset: number, limit: number): Promise<ProjectDomain[]> => {
    return await ProjectModel
        .find({})
        .sort({ publishedAt: 'desc' })
        .skip(offset)
        .limit(limit);
};

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getProjects2 = async (): Promise<ProjectDomain[]> => {
    return await ProjectModel
        .find({})
        .sort({ publishedAt: 'desc' });
};

export const createProject = async (payload: ProjectDomain): Promise<ProjectDomain> => {
    return await new ProjectModel(payload)
        .save();
};
