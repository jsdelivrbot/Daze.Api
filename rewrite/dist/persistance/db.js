"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var Connection = /** @class */ (function () {
    function Connection() {
        this.client = new pg_1.Client({
            host: 'localhost',
            database: 'daze_db',
            password: 'daze',
            user: 'daze'
        });
        this.client.connect();
    }
    Object.defineProperty(Connection, "instance", {
        get: function () {
            if (this._instance == null)
                this._instance = new Connection();
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    Connection.prototype.getConnection = function () {
        return Connection.instance.client;
    };
    return Connection;
}());
exports.Connection = Connection;
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
