import { Request, Response, Router } from 'express';
import { HAL, HALLinks } from './halTypes';
import { Post } from '../domain';
import { db } from '../persistance';
import { Pool, PoolClient } from 'pg';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const posts = await db.getPosts(1, 1);

    const hal: HAL<Post> = {
        totalCount: posts.length,
        _links: {
            self: { href: '/api/post/2' },
            next: { href: '/api/post/2/2' }
        },
        _embedded: posts
    };

    return res.json(hal);
});

// "/api/post/%i/%i"
const getPaginated = async (req: Request, res: Response) => {
    const { page, pageSize } = req.params;
    // const posts = await db.getPostsPaginated(page, pageSize);
};

// "/api/post/%i"
const getSingle = (req: Request, res: Response) => {
    return res.json();
};

// "/api/post/slug/%s"
const getSingleBySlug = () => { };

// "/api/post/%i/tag"
const getPostTags = () => { };

// "/api/post/%i"
const head = () => { };

// "/api/post/" 
const asyncOptions = () => { };

const NOT_IMPLEMENTED = (req: Request, res: Response) =>
    res.end('NOT IMPLEMENTED');

// postRouter.get("/api/post/:id", getSingle);
// postRouter.get("/api/post/slug/%s", NOT_IMPLEMENTED);
// postRouter.get("/api/post/%i/tag", NOT_IMPLEMENTED);
// postRouter.get("/api/post/%i/%i", NOT_IMPLEMENTED);
// postRouter.head("/api/post/%i", NOT_IMPLEMENTED);
// postRouter.options("/api/post/", NOT_IMPLEMENTED);


export default router;
