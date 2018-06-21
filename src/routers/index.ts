import { Express } from 'express';
import { defaultCors } from '../apiConfig';
import post from './postRouter';
import project from './projectRouter';
import resource from './resourceRouter';
import skill from './skillRouter';

export default (app: Express) => {
    app.use('/api/posts', defaultCors, post);
    app.use('/api/projects', defaultCors, project);
    app.use('/api/resources', defaultCors, resource);
    app.use('/api/skills', defaultCors, skill);
};
