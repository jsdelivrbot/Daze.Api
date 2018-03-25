import * as postDb from './postDb';
import * as projectDb from './projectDb';
import { Pool } from 'pg';

export const db = {
    ...postDb,
    ...projectDb
};
