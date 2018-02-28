import { Project } from "../domain";
import { Connection } from "./connection";
import * as R from "ramda";
import * as humps from 'humps';
import { Pool } from "pg";

export const getProjects = async (pool: Pool): Promise<Project[]> => {
    try {
        const query = await pool.query(`
            select p.*
            from public.Project as p
        `);
        return query.rows.map(R.unary(humps.camelizeKeys)) as Project[];
    } catch (err) {
        throw err;
    }
};  
