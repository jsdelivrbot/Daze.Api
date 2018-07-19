import { Router } from 'express';
import { createHAL } from './halTypes';
import { db } from '../persistance';
import { parseNumber } from '../common/utils';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const posts = await db.getPosts();

        const hal = createHAL(posts);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const createdPost = await db.createPost(payload);

        const hal = createHAL(createdPost);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

router.get('/:offset/:limit', async (req, res) => {
    try {
        const { offset, limit } = req.params;

        const posts = await db.getPosts2(
            parseNumber(offset),
            parseNumber(limit)
        );

        const hal = createHAL(posts);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await db.getPostBySlug(slug);

        const hal = createHAL(post);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;
