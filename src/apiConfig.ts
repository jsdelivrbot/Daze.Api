import * as cors from 'cors';

type CustomOriginCallback = (err: Error | null, allow?: boolean) => void

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://daze-spa.herokuapp.com',
    'https://afractal.herokuapp.com',
    'http://afractal.herokuapp.com',
    'http://afractal.me',
    'https://afractal.me',
    'http://www.afractal.me',
    'https://www.afractal.me'
];

const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Cache-Control',
    'Last-Modified',
    'Pragma',
    'Expires',
    'Content-Language',
    "Content-Type",
    'Content-Length',
    "Accept",
    "X-Access-Token"
];

const defaultCorsConfig = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: allowedHeaders,
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 3600,
    origin(requestOrigin: string, callback: CustomOriginCallback) {
        return allowedOrigins.includes(requestOrigin) ?
            callback(null, true) :
            callback(new Error('Origin Not Allowed by CORS'), false);
    }
};

export const defaultCors = cors(defaultCorsConfig);
