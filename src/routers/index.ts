import { Express } from 'express';
import { defaultCors } from '../apiConfig';
import postRouter from './postRouter';
import projectRouter from './projectRouter';
import resourceRouter from './resourceRouter';
import skillRouter from './skillRouter';
import bookRouter from './bookRouter';

export default (app: Express) => {
    app.use('/api/posts', defaultCors, postRouter);
    app.use('/api/projects', defaultCors, projectRouter);
    app.use('/api/resources', defaultCors, resourceRouter);
    app.use('/api/skills', defaultCors, skillRouter);
    app.use('/api/books', defaultCors, bookRouter);
};
