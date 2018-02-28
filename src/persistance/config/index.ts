import prodConfig from './config.prod';
import devConfig from './config.prod';

const env = process.env.NODE_ENV;

export default (env == 'production') ?
    prodConfig :
    devConfig;
