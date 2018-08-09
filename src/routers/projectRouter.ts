import { Router } from 'express';
import { db } from '../persistance';
import { createHAL } from './halTypes';
import { authenticate } from '../middleware';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const projects = await db.getProjects2();

        const hal = createHAL(projects);
        return res.json(hal);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.get('/:offset/:limit', async (req, res) => {
    try {
        const { offset, limit } = req.params;
        const projects = await db.getProjects(offset, limit);

        const hal = createHAL(projects);
        return res.json(hal);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post('/', authenticate, async (req, res) => {
    try {
        const payload = req.body;
        const createdProject = db.createProject(payload);

        const hal = createHAL(createdProject);
        return res.json(hal);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

export default router;
