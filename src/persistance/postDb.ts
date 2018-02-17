import { Connection } from "./db";
import { Post } from "../domain";


export const getPosts = async (): Promise<Post[]> => {
    const query = await Connection.instance
        .getConnection()
        .query(`
            SELECT * FROM public.Post
        `);
    return query.rows;
};

export const getPostsPaginated = async (page: number, pageSize: number): Promise<Post[]> => {
    throw '';
    // const query = await Connection.instance.getConnection()
    //     .query(`

    //     `);
    // return query.rows;
};



