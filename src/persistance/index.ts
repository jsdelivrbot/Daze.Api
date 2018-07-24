import * as postDb from './postDb';
import * as projectDb from './projectDb';
import * as resourceDb from './resourceDb';
import * as skillDb from './skillDb';
import * as booksDb from './bookDb';

export const db = {
    ...postDb,
    ...projectDb,
    ...resourceDb,
    ...skillDb,
    ...booksDb
};
