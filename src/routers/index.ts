import { Express } from 'express';
import post from './postRouter';

export default (app: Express) => {
    app.use('/api/posts', post);
};
