import * as express from 'express';

const router = express.Router();

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

router.get("/api/skill/", NOT_IMPLEMENTED);
router.get("/api/skill/%i", NOT_IMPLEMENTED);
router.head("/api/skill/%i", NOT_IMPLEMENTED);
router.options("/api/skill/", NOT_IMPLEMENTED);

export default router;
