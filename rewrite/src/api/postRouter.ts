import { Request, Response } from 'express';
import { Db } from '../persistance';

// "/api/post/"
export const get = async (request: Request, response: Response) => {
    const posts = await Db.posts.getPosts();
    return response.json(posts);
};

// "/api/post/%i"
export const getSingle = () => { };

// "/api/post/slug/%s"
export const getSingleBySlug = () => { };

// "/api/post/%i/tag"
export const getPostTags = () => { };

// "/api/post/%i/%i"
export const getPaginated = () => { };

// "/api/post/%i"
export const head = () => { };

// "/api/post/" 
export const asyncOptions = () => { };

