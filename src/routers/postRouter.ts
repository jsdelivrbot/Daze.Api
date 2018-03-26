import { Request, Response, Router } from 'express';
import { HAL, HALLinks, createHAL } from './halTypes';
import { Post } from '../domain';
import { db } from '../persistance';
import { Pool, PoolClient } from 'pg';

const router = Router();

router.get('/', async (req, res) => {
    const posts = await db.getPosts(1, 2);

    const hal = createHAL(posts);
    return res.json(hal);
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const post = await db.getPostBySlug(slug);

    const hal = createHAL(post);
    return res.json(hal);
});

router.get('/:page/:pageSize', async (req: Request, res: Response) => {
    const { page, pageSize } = req.params;
    const posts = await db.getPosts(page, pageSize);

    const hal = createHAL(posts);
    return res.json(hal);
});

export default router;
