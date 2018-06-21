import { Router } from "express";
import { db } from "../persistance";
import { createHAL } from "./halTypes";

const router = Router();

router.get('/', async (req, res) => {
    const skills = await db.getSkills();

    const hal = createHAL(skills);
    return res.json(hal);
});

export default router;