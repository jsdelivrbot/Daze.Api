import * as express from 'express';

const router = express.Router();

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

router.get("/api/project/", (req, res) => { });
router.get("/api/project/%i", NOT_IMPLEMENTED);
router.head("/api/project/%i", NOT_IMPLEMENTED);
router.options("/api/project/", NOT_IMPLEMENTED);


export default router;
