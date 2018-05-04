import { Client, PoolClient, Pool, QueryResult } from "pg";
import config from "../common/configuration";

// export class Connection {
//     private constructor() {
//         this.client = new Client({
//             ...config,
//         });
//         this.client.connect();
//     }

//     private client: Client;

//     private static _instance: Connection;
//     static get instance(): Connection {
//         if (this._instance == null)
//             this._instance = new Connection();

//         return this._instance;
//     }

//     getConnection() {
//         return Connection.instance.client;
//     }
// }

// import { Pool } from 'pg';

// export const createPool = (): Pool => {
//     return new Pool({
//         ...config,
//         max: 20
//     });
// };

const pool = new Pool({
    ...config,
    max: 20,
    ssl: true
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

// const DB_KEY = Symbol('db');

// global[DB_KEY] = {
//     db: "lol"
// };

// let client = new Client({
//     host: 'localhost',
//     database: 'daze_db',
//     password: 'daze',
//     user: 'daze'
// });

// client.connect();
// console.log('hello');
// export const Db = client;
