import * as postDb from './postDb';
import * as projectDb from './projectDb';
import * as resourceDb from './resourceDb';
import { Pool } from 'pg';

export const db = {
    ...postDb,
    ...projectDb,
    ...resourceDb
};
