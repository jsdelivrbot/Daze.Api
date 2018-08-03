import { Router } from 'express';
import { db } from '../persistance';
import { createHAL } from './halTypes';

const router = Router();

router.post('/users', async (req, res) => {
    try {
        const user = req.body;
        const createdUser = await db.createUser(user);

        const hal = createHAL(createdUser);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;