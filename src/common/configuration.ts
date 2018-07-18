import { ENV } from "../common/enviromnent";
import dotenv from 'dotenv';

dotenv.config();

type ConfigurationNode = {
    host: string
    port: string
    name: string
};

type Configuration = {
    development: ConfigurationNode
    production: ConfigurationNode
};

const config: Configuration = {
    development: {
        host: 'localhost',
        port: '27017',
        name: 'daze_db'
    },
    production: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME
    }
};

export default config[ENV];
