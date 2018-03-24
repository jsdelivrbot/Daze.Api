import express from "express";
import { defaultCors } from "./apiConfig";
import { pool } from "./persistance/pgPool";
import { ENV } from "./common/enviromnent";
import * as bodyParser from "body-parser";
import expressValidator from "express-validator";
import compression from "compression";
import { postRouter } from "./controllers/postRouter";
import logger from "./util/logger";

// import * as  swaggerUi from 'swagger-ui-express';
// const swaggerDocument = require('./swagger.json');

const PORT = +(process.env.PORT || "8080");
const HOST_NAME = ENV == "production" ? "0.0.0.0" : "127.0.0.1";

const app = express();
const router = express.Router();

// router.use(defaultCors);
// router.options('*', defaultCors);

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// Controllers (route handlers)
app.use("/api/post", postRouter);

app.all("*", (req, res) => {
    return res.end("NOT FOUND");
});

app.get("/", (req, res) => {
    res.end("__daze_api__");
});

export default app;
