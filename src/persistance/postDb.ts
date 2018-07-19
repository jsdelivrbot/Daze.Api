import { PostDomain, PostDocument } from "../domain";
import { PostModel } from '../schemas';

export const getPosts = async (): Promise<PostDomain[]> => {
    return await PostModel
        .find({})
        .sort({ createdAt: 'desc' });
};

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getPosts2 = async (offset: number, limit: number): Promise<PostDomain[]> => {
    return await PostModel
        .find({})
        .sort({ createdAt: 'desc' })
        .skip(offset)
        .limit(limit);
};

export const getPostBySlug = async (slug: string): Promise<PostDomain> => {
    return await PostModel
        .findOne({ slug: slug });
};

export const createPost = async (payload: PostDomain): Promise<PostDomain> => {
    return await new PostModel(payload)
        .save();
};
