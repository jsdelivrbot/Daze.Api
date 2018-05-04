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
        host: 'ec2-79-125-13-42.eu-west-1.compute.amazonaws.com', // process.env.DATABASE_HOST,
        database: 'd581ac58mau63r', // process.env.DATABASE_NAME,
        password: '314ce477224861d0f7946cd6e4f3af114cd1d45c874eab6e34602e2aafa47fd9', // process.env.DATABASE_PASSWORD,
        user: 'yyvtjjkjittkdg', // process.env.DATABASE_USER
    }
};

// export default config[ENV];
export default config['production'];
