import { Project } from "../domain";
import { Connection } from "./connection";
import R from "ramda";
import { camelizeKeys } from "humps";
import { Pool } from "pg";

export const getProjects = async (pool: Pool): Promise<Project[]> => {
    try {
        const query = await pool.query(`
            select p.*
            from public.Project as p
        `);
        return query.rows.map(R.unary(camelizeKeys)) as Project[];
    } catch (err) {
        throw err;
    }
};  
