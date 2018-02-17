import { Request, Response } from 'express';
import { Db } from '../persistance';
import { HAL } from './types';
import { Post } from '../domain';

const createHal = () => {

};

// "/api/post/"
export const get = async (req: Request, res: Response) => {
    const posts = await Db.posts.getPosts();

    const links = {
        Self: { href: '/api/post/2' },
        Next: { href: '/api/post/2/2' }
    };
    const hal: HAL<Post> = {
        totalCount: posts.length,
        _links: links,
        _embedded: posts
    };

    return res.json(hal);
};

// "/api/post/%i/%i"
export const getPaginated = async (req: Request, res: Response) => {
    const { page, pageSize } = req.params;
    const posts = await Db.posts.getPostsPaginated(page, pageSize)

};

// "/api/post/%i"
export const getSingle = (req: Request, res: Response) => {

    return res.json();
};

// "/api/post/slug/%s"
export const getSingleBySlug = () => { };

// "/api/post/%i/tag"
export const getPostTags = () => { };


// "/api/post/%i"
export const head = () => { };

// "/api/post/" 
export const asyncOptions = () => { };

