"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.projectRouter = express.Router();
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
exports.projectRouter.get("/api/project/", function (req, res) { });
exports.projectRouter.get("/api/project/%i", NOT_IMPLEMENTED);
exports.projectRouter.head("/api/project/%i", NOT_IMPLEMENTED);
exports.projectRouter.options("/api/project/", NOT_IMPLEMENTED);
