import { Post as PostDomain } from "../domain";
import { PostModel } from '../schemas';

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getPosts = async (offset: number, limit: number): Promise<PostDomain[]> => {
    try {
        return await PostModel
            .find({})
            .sort({ createdAt: 'desc' })
            .skip(offset)
            .limit(limit);
    } catch (err) {
        throw err;
    }
};

export const getPostBySlug = async (slug: string): Promise<PostDomain> => {
    try {
        return await PostModel
            .findOne({ slug: slug });
    } catch (err) {
        throw err;
    }
};
