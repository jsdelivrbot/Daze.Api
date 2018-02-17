"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var apiConfig_1 = require("./apiConfig");
var postRouter_1 = require("./api/postRouter");
var tagRouter_1 = require("./api/tagRouter");
var skillRouter_1 = require("./api/skillRouter");
var projectRouter_1 = require("./api/projectRouter");
var env = process.env.NODE_ENV;
var PORT = +(process.env.PORT || '8080');
var HOST_NAME = env == 'production' ? '0.0.0.0' : '127.0.0.1';
var app = express();
var router = express.Router();
router.use(apiConfig_1.defaultCors);
router.options('*', apiConfig_1.defaultCors);
app.get('/', function (request, response) {
    response.end('__daze_api__');
});
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
app.post("/api/login/", NOT_IMPLEMENTED);
app.use('/api/post', postRouter_1.default);
app.use('/api/tag', tagRouter_1.default);
app.use('/api/skill', skillRouter_1.default);
app.use('/api/project', projectRouter_1.default);
app.all('*', function (req, res) {
    return res.end('NOT FOUND');
});
var server = app.listen(PORT, HOST_NAME, function () {
    console.log("Server is listening at http://" + HOST_NAME + ":" + PORT);
});
