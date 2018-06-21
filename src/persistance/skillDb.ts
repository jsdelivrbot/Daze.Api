import { unary } from 'ramda';
import { camelizeKeys } from 'humps';
import conn from './connection';
import { Skill } from '../domain';

export const getSkills = async () => {
    try {
        const query = await conn.query(`
            select s.*
            from public.skill as s
            order by s.level desc
        `);
        return query.rows.map<Skill>(unary(camelizeKeys));
    } catch (err) {
        throw err;
    }
};
