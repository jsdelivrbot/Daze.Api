import { Connection } from "./db";


export const getPosts = async () => {
    return await Connection.instance.getConnection().query(`SELECT * FROM public.Post`);
};

