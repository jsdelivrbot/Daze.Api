import { Router } from "express";
import { db } from "../persistance";
import { createHAL } from "./halTypes";
import { authenticate } from "../middleware";

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

router.post('/', authenticate, async (req, res) => {
    try {
        const payload = req.body; 
        const createdResource = await db.createResource(payload);

        const hal = createHAL(createdResource);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;
