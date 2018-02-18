"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.skillRouter = express.Router();
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
exports.skillRouter.get("/api/skill/", NOT_IMPLEMENTED);
exports.skillRouter.get("/api/skill/%i", NOT_IMPLEMENTED);
exports.skillRouter.head("/api/skill/%i", NOT_IMPLEMENTED);
exports.skillRouter.options("/api/skill/", NOT_IMPLEMENTED);
