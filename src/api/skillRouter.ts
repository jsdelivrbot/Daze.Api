import * as express from 'express';

export const skillRouter = express.Router();

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

skillRouter.get("/api/skill/", NOT_IMPLEMENTED);
skillRouter.get("/api/skill/%i", NOT_IMPLEMENTED);
skillRouter.head("/api/skill/%i", NOT_IMPLEMENTED);
skillRouter.options("/api/skill/", NOT_IMPLEMENTED);
