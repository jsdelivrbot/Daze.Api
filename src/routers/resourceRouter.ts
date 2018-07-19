import { Router } from "express";
import { db } from "../persistance";
import { createHAL } from "./halTypes";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const resources = await db.getResources();

        const hal = createHAL(resources);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;