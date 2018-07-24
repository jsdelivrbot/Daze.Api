import { Router } from 'express';
import { createHAL } from './halTypes';
import { db } from '../persistance';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const books = await db.getBooks();

        const hal = createHAL(books);
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
        const payload = req.body;
        const createdBook = db.createBook(payload);

        const hal = createHAL(createdBook);
        return res.json(hal);
    }
    catch (err) {
        return res
            .status(500)
            .send(err);
    }
});

export default router;
