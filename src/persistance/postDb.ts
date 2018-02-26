import { Connection } from "./db";
import { Post } from "../domain";


/** 
 * @param page the offset number for the page starting at 1
 * @param pageSize the size limit for the page  
 **/
export const getPosts = async (page: number, pageSize: number): Promise<Post[]> => {
    try {
        const query = await Connection.instance
            .getConnection()
            .query(`
                select p.*  
                from public.Post as p 
                order by p.created_at desc
                offset $1
                limit $2
            `, [page - 1, pageSize]);
        return query.rows;
    } catch (err) {
        throw err;
    }
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
    try {
        const query = await Connection.instance
            .getConnection()
            .query(`
                select p.*
                from public.Post as p
                where p.slug = $1
            `, [slug]);
        return query.rows[0];
    } catch (err) {
        throw err;
    }
};


export const getPostsPaginated = async (page: number, pageSize: number): Promise<Post[]> => {
    throw '';
    // const query = await Connection.instance.getConnection()
    //     .query(`

    //     `);
    // return query.rows;
};



