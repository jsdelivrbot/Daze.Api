
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

type Environment = 'development' | 'production'

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

const env = (process.env.NODE_ENV || 'development') as Environment;

export default config[env];
