import * as postDb from './postDb';
import * as projectDb from './projectDb';
import * as resourceDb from './resourceDb';
import * as skillDb from './skillDb';

export const db = {
    ...postDb,
    ...projectDb,
    ...resourceDb,
    ...skillDb
};
