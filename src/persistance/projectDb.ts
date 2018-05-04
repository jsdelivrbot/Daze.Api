import { Project } from "../domain";
import { unary } from "ramda";
import { camelizeKeys } from "humps";
import conn from "./connection";

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getProjects = async (offset: number, limit: number): Promise<Project[]> => {
    try {
        const query = await conn.query(`
            select p.*
            from public.Project as p
            order by p.published_year desc
            offset $1
            limit $2
        `, [offset - 1, limit]);

        return query.rows.map<Project>(unary(camelizeKeys));
    } catch (err) {
        throw err;
    }
};

/**
 * @param offset the offset number for the page starting at 1
 * @param limit the size limit for the page
 **/
export const getProjects2 = async (): Promise<Project[]> => {
    try {
        const query = await conn.query(`
            select p.*
            from public.Post as p
            order by p.created_at desc
        `);

        return query.rows.map<Project>(unary(camelizeKeys));
    } catch (err) {
        throw err;
    }
};


