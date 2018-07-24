import { Router } from "express";
import { db } from "../persistance";
import { createHAL } from "./halTypes";
import { SkillDomain } from "../domain";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const skills = await db.getSkills();

        const hal = createHAL(skills);
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
        const skill = req.body;
        const createdSkill = await db.createSkill(skill);

        const hal = createHAL(createdSkill);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;
