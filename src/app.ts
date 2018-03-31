import express from "express";
import { defaultCors } from "./apiConfig";
import { ENV } from "./common/enviromnent";
import bodyParser from "body-parser";
import expressValidator from "express-validator";
import compression from "compression";
import mountRoutes from "./routers";

const PORT = process.env.PORT || '8080';
const HOST_NAME = ENV == 'production' ? '0.0.0.0' : '127.0.0.1';

const app = express();

// express configuration
app.set('port', PORT);
app.set('hostname', HOST_NAME);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(defaultCors);
// app.options('*', defaultCors);

// route handlers
mountRoutes(app);

app.get('/', (req, res) => res.end('__daze_api__'));
app.all('*', (req, res) => res.status(404).end('NOT FOUND'));

export default app;
