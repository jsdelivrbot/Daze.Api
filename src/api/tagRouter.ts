import * as express from 'express';

export const tagRouter = express.Router();

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

tagRouter.get("/api/tag/", NOT_IMPLEMENTED);
tagRouter.get("/api/tag/%i", NOT_IMPLEMENTED);
tagRouter.get("/api/tag/%i/%i", NOT_IMPLEMENTED);
tagRouter.head("/api/tag/%i", NOT_IMPLEMENTED);
tagRouter.options("/api/tag/", NOT_IMPLEMENTED);

