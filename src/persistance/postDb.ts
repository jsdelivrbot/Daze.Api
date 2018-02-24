import { Connection } from "./db";
import { Post } from "../domain";

export const getPosts = async (): Promise<Post[]> => {
    try {
        const query = await Connection.instance
            .getConnection()
            .query(`
                select p.* 
                from public.Post as p 
            `);
        return query.rows;
    } catch (err) {
        throw err;
    }
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
    console.log(slug);
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



