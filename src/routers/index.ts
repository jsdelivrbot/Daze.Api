import { Express } from 'express';
import post from './postRouter';
import project from './projectRouter';

export default (app: Express) => {
    app.use('/api/posts', post);
    app.use('/api/projects', project);
};
