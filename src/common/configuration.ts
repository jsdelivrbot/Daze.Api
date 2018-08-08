import { ENV } from "../common/enviromnent";
import dotenv from 'dotenv';

dotenv.config();

type ConfigurationNode = {
    host: string
    port: string
    name: string
    jwtSecret: string
};

type Configuration = {
    development: ConfigurationNode
    production: ConfigurationNode
};

const config: Configuration = {
    development: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        jwtSecret: process.env.JWT_SECRET
    },
    production: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        name: process.env.DATABASE_NAME,
        jwtSecret: process.env.JWT_SECRET
    }
};

export default config[ENV];
