import { Client, PoolClient, Pool, QueryResult } from "pg";
import config from "../common/configuration";

const pool = new Pool({
    ...config,
    max: 20,
    // ssl: true
});

console.log('pool connected');

export default {
    async query(queryText: string, values?: any[]): Promise<QueryResult> {
        try {
            return await pool.query(queryText, values);
        } catch (err) {
            throw err;
        }
    }
};
