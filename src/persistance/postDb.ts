// import { Connection } from "./connection";
import { Post } from "../domain";
import { Pool, PoolClient } from "pg";
import { unary } from 'ramda';
import { camelizeKeys } from 'humps';
import conn from './connection';

/**
 * @param page the offset number for the page starting at 1
 * @param pageSize the size limit for the page
 **/
export const getPosts = async (page: number, pageSize: number): Promise<Post[]> => {
    try {
        const query = await conn.query(`
            select p.*
            from public.Post as p
            order by p.created_at desc
            offset $1
            limit $2
        `, [page - 1, pageSize]);

        return query.rows.map<Post>(unary(camelizeKeys));
    } catch (err) {
        throw err;
    }
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
    try {
        const query = await conn.query(`
            select p.*
            from public.Post as p
            where p.slug = $1
        `, [slug]);

        return camelizeKeys(query.rows[0]) as Post;
    } catch (err) {
        throw err;
    }
};
