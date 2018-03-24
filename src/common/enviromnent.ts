
type Environment = 'development' | 'production';

export const ENV = (process.env.NODE_ENV || 'development') as Environment;
