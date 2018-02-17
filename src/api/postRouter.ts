import { Request, Response } from 'express';
import { Db } from '../persistance';
import { HAL } from './types';
import { Post } from '../domain';
import * as express from 'express';

const createHal = () => { };

const router = express.Router();

// "/api/post/"11
router.get("/", async (req, res) => {
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
});

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



const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) =>
    res.end('NOT IMPLEMENTED');

router.get("/api/post/:id", getSingle);
router.get("/api/post/slug/%s", NOT_IMPLEMENTED);
router.get("/api/post/%i/tag", NOT_IMPLEMENTED);
router.get("/api/post/%i/%i", NOT_IMPLEMENTED);
router.head("/api/post/%i", NOT_IMPLEMENTED);
router.options("/api/post/", NOT_IMPLEMENTED);


export default router;
