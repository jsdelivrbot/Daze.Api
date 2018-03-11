import { Connection } from "./connection";
import { Post } from "../domain";
import { Pool } from "pg";
import * as R from 'ramda';
import { camelizeKeys } from 'humps';

/** 
 * @param page the offset number for the page starting at 1
 * @param pageSize the size limit for the page  
 **/
export const getPosts = async (pool: Pool, page: number, pageSize: number): Promise<Post[]> => {
    try {
        const query = await pool.query(`
            select p.*  
            from public.Post as p 
            order by p.created_at desc
            offset $1
            limit $2
        `, [page - 1, pageSize]);
        return query.rows.map(R.unary(camelizeKeys)) as Post[];
    } catch (err) {
        throw err;
    }
};

export const getPostBySlug = async (pool: Pool, slug: string): Promise<Post> => {
    try {
        const query = await pool.query(`
            select p.*
            from public.Post as p
            where p.slug = $1
        `, [slug]);
        return camelizeKeys(query.rows[0]) as Post;
    } catch (err) {
        throw err;
    }
};


