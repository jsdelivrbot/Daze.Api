import { unary } from 'ramda';
import { camelizeKeys } from 'humps';
import conn from './connection';
import { Resource } from '../domain';

export const getResources = async () => {
    try {
        const query = await conn.query(`
            select r.*
            from public.resource as r
        `);
        return query.rows.map<Resource>(unary(camelizeKeys));
    } catch (err) {
        throw err;
    }
};
