import { Project as ProjectDomain } from "../domain";
import { ProjectModel } from "../schemas";

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getProjects = async (offset: number, limit: number): Promise<ProjectDomain[]> => {
    try {
        return await ProjectModel
            .find({})
            .sort({ publishedAt: 'desc' })
            .skip(offset)
            .limit(limit);
    } catch (err) {
        throw err;
    }
};

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getProjects2 = async (): Promise<ProjectDomain[]> => {
    try {
        return await ProjectModel
            .find({})
            .sort({ publishedAt: 'desc' });
    } catch (err) {
        throw err;
    }
};


