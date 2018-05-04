import { Router } from 'express';
import { HAL, createHAL } from './halTypes';
import { Post } from '../domain';
import { db } from '../persistance';
import { defaultCors } from '../apiConfig';

const router = Router();

router.get('/', async (req, res) => {
    const posts = await db.getPosts(1, 2);

    const hal = createHAL(posts);
    return res.json(hal);
});

router.get('/:offset/:limit', async (req, res) => {
    const { offset, limit } = req.params;
    const posts = await db.getPosts(offset, limit);

    const hal = createHAL(posts);
    return res.json(hal);
});

router.get('/:slug', async (req, res) => {
    const { slug } = req.params;
    const post = await db.getPostBySlug(slug);

    const hal = createHAL(post);
    return res.json(hal);
});

export default router;
