import { Router } from "express";
import { db } from "../persistance";
import { createHAL } from "./halTypes";

const router = Router();

router.get('/', async (req, res) => {
    const resources = await db.getResources();

    const hal = createHAL(resources);
    return res.json(hal);
});

export default router;