import * as express from 'express';

const router = express.Router();

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

router.get("/api/tag/", NOT_IMPLEMENTED);
router.get("/api/tag/%i", NOT_IMPLEMENTED);
router.get("/api/tag/%i/%i", NOT_IMPLEMENTED);
router.head("/api/tag/%i", NOT_IMPLEMENTED);
router.options("/api/tag/", NOT_IMPLEMENTED);


export default router;
