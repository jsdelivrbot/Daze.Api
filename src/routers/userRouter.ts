import { Router } from 'express';
import { db } from '../persistance';
import { createHAL } from './halTypes';
import { authenticate } from '../middleware';
import { registrationSchema } from '../validations/validationSchemas';

const router = Router();

router.post('/register', async (req, res) => {
    try {
        req.checkBody(registrationSchema);
        const errors = req.validationErrors();
        if (errors) {
            return res.status(500).json(errors);
        }

        const payload = req.body;
        const { user, token } = await db.createUser(payload);

        const hal = createHAL(user);
        return res.header('x-auth', token).json(hal);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.get('/me', authenticate, async (req, res) => {
    try {
        const payload = (req as any).user;

        const hal = createHAL(payload);
        return res.json(hal);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await db.findUser(email, password);

        if (!user) {
            return res.status(401).send();
        }

        return res.header('x-auth', token).json(user);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.delete('/me/token', authenticate, async (req, res) => {
    try {
        const token = (req as any).token;

        await db.removeTokenFromUser(token);
        return res.status(200).send();
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

export default router;
