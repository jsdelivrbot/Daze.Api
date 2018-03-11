import { ENV } from "../common/enviromnent";

type ConfigurationNode = {
    host: string
    database: string
    password: string
    user: string
}

type Configuration = {
    development: ConfigurationNode
    production: ConfigurationNode
}

const config: Configuration = {
    development: {
        host: 'localhost',
        database: 'daze_db',
        password: 'daze',
        user: 'daze'
    },
    production: {
        host: 'localhost',
        database: 'daze_db',
        password: 'daze',
        user: 'daze'
    }
};

export default config[ENV];
