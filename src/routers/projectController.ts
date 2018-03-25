import * as express from 'express';

export const projectRouter = express.Router();

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
    res.end('NOT IMPLEMENTED');
};

projectRouter.get("/api/project/", (req, res) => { });
projectRouter.get("/api/project/%i", NOT_IMPLEMENTED);
projectRouter.head("/api/project/%i", NOT_IMPLEMENTED);
projectRouter.options("/api/project/", NOT_IMPLEMENTED);
