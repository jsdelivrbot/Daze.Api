import { Router } from 'express';
import { db } from '../persistance';
import { createHAL } from './halTypes';
import { authenticate } from '../middleware';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const user = req.body;
        const { token, createdUser } = await db.createUser(user);

        const hal = createHAL(createdUser);
        return res
            .header('x-auth', token)
            .json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

router.get('/me', authenticate, async (req, res) => {
    try {
        const user = (req as any).user;

        const hal = createHAL(user);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;
