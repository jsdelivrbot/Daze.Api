import { Client } from "pg";
import config from './config';

export class Connection {
    private constructor() {
        this.client = new Client({
            host: config.host,
            database: config.database,
            password: config.password,
            user: config.user
        });
        this.client.connect();
    }

    private client: Client;

    private static _instance: Connection;
    static get instance(): Connection {
        if (this._instance == null)
            this._instance = new Connection();

        return this._instance;
    }

    getConnection() {
        return Connection.instance.client;
    }
}

// import { Pool } from 'pg';
// export const pool = new Pool({
//     host: 'localhost',
//     database: 'daze_db',
//     password: 'daze',
//     user: 'daze'
// });


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
