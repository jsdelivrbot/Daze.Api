import { Request, Response, NextFunction } from 'express';

export const asyncMiddleware = (middleware: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        Promise
            .resolve(middleware(req, res, next))
            .catch(next);
    };
};




