import { Request, Response, NextFunction } from 'express';
import { db } from '../persistance';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth');
    const foundUser = await db.findAuthenticatedUser(token);

    if (!foundUser) {
        return res
            .status(401)
            .send();
    }

    (req as any).user = foundUser;
    (req as any).token = token;

    next();
};
