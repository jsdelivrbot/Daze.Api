import { Express } from 'express';
import post from './postRouter';
import project from './projectRouter';
import { defaultCors } from '../apiConfig';

export default (app: Express) => {
    app.use('/api/posts', defaultCors, post);
    app.use('/api/projects', defaultCors, project);
};