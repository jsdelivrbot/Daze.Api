"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var apiConfig_1 = require("./apiConfig");
var env = process.env.NODE_ENV;
var PORT = process.env.PORT || '8080';
var HOST_NAME = env == 'production' ? '0.0.0.0' : '127.0.0.1';
var app = express();
var router = express.Router();
router.use(apiConfig_1.defaultCors);
router.options('*', apiConfig_1.defaultCors);
app.get('/', function (request, response) {
    response.end('HELLO WORLD');
});
app.listen(+PORT, HOST_NAME, function () {
    console.log("Server is listening at http://" + HOST_NAME + ":" + PORT);
});
