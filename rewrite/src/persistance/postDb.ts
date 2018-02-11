import { Client } from 'pg';


export const getPosts = async () => {
    const client = new Client({
        host: 'localhost',
        database: 'daze_db',
        password: 'daze',
        user: 'daze'
    });

    await client.connect();

    return await client.query(`SELECT * FROM public.Post`);
};


