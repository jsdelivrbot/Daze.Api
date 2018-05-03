import { ENV } from "../common/enviromnent";

type ConfigurationNode = {
    host: string
    database: string
    password: string
    user: string
};

type Configuration = {
    development: ConfigurationNode
    production: ConfigurationNode
};

const config: Configuration = {
    development: {
        host: 'localhost',
        database: 'daze_db',
        password: '',
        user: 'postgres'
    },
    production: {
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER
    }
};

export default config[ENV];
