import cors from "cors";

const allowedOrigins = [
    'localhost',
    '127.0.0.1',
    'daze-spa.herokuapp.com',
    'daze-api.herokuapp.com',
    'afractal.herokuapp.com',
    'afractal.me',
    'www.afractal.me'
];

const allowedHeaders = [
    'Origin',
    'X-Requested-With',
    'Cache-Control',
    'Last-Modified',
    'Pragma',
    'Expires',
    'Content-Language',
    'Content-Type',
    'Content-Length',
    'Accept',
    'X-Access-Token'
];

const allowedMethods = [
    'GET',
    'HEAD',
    'PUT',
    'PATCH',
    'POST',
    'DELETE'
];

const defaultCorsConfig = {
    methods: allowedMethods,
    allowedHeaders: allowedHeaders,
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 204,
    maxAge: 3600
};

export const defaultCors = cors((req, callback) => {
    const requestOrigin = req.hostname;
    allowedOrigins.includes(requestOrigin)
        ? callback(undefined, { ...defaultCorsConfig, origin: true })
        : callback(new Error("Origin Not Allowed by CORS"), { ...defaultCorsConfig, origin: false });
});


