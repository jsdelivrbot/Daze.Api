import { Project } from "../domain";
import { Connection } from "./db";

export const getProjects = async (): Promise<Project[]> => {
    try {
        const query = await Connection.instance
            .getConnection()
            .query(`
                select p.*
                from public.Project as p
            `);
        return query.rows;
    } catch (err) {
        throw err;
    }
};  
