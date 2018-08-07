import { Router } from 'express';
import { db } from '../persistance';
import { createHAL } from './halTypes';
import { authenticate } from '../middleware';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const { token, user } = await db.createUser(payload);

        const hal = createHAL(user);
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
        const payload = (req as any).user;

        const hal = createHAL(payload);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const { user, token } = await db.findUser(email, password);
        if (!user) {
            return res
                .status(401)
                .send();
        }

        return res
            .header('x-auth', token)
            .json(user);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});


export default router;
