import { Request, Response } from 'express';
import { HAL } from './types';
import { Post } from '../domain';
import * as express from 'express';

const createHal = () => { };

export const postRouter = express.Router();

// "/api/post/"11
postRouter.get("/", async (req, res) => {
});

// "/api/post/%i/%i"
const getPaginated = async (req: Request, res: Response) => {
    ;
};

// "/api/post/%i"
const getSingle = (req: Request, res: Response) => {
    return res.json();
};

// "/api/post/slug/%s"
const getSingleBySlug = () => { };

// "/api/post/%i/tag"
const getPostTags = () => { };

// "/api/post/%i"
const head = () => { };

// "/api/post/" 
const asyncOptions = () => { };

const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) =>
    res.end('NOT IMPLEMENTED');

postRouter.get("/api/post/:id", getSingle);
postRouter.get("/api/post/slug/%s", NOT_IMPLEMENTED);
postRouter.get("/api/post/%i/tag", NOT_IMPLEMENTED);
postRouter.get("/api/post/%i/%i", NOT_IMPLEMENTED);
postRouter.head("/api/post/%i", NOT_IMPLEMENTED);
postRouter.options("/api/post/", NOT_IMPLEMENTED);


