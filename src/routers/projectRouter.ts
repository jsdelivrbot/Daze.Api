import { Router } from "express";
import { db } from "../persistance";
import { createHAL } from "./halTypes";

const router = Router();

router.get('/', async (req, res) => {
    const projects = await db.getProjects(1, 2);

    const hal = createHAL(projects);
    return res.json(hal);
});

router.get('/:offset/:limit', async (req, res) => {
    const { offset, limit } = req.params;
    const projects = await db.getProjects(offset, limit);

    const hal = createHAL(projects);
    return res.json(hal);
});

export default router;
