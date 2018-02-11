"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var PORT = 3000;
var HOST_NAME = 'localhost';
var app = express();
app.get('/', function (request, response) {
    response.end('HELLO WORLD');
});
app.listen(PORT, HOST_NAME, function () {
    console.log("Server is listening at http://" + HOST_NAME + ":" + PORT);
});
