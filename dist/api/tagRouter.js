"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
exports.tagRouter = express.Router();
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
exports.tagRouter.get("/api/tag/", NOT_IMPLEMENTED);
exports.tagRouter.get("/api/tag/%i", NOT_IMPLEMENTED);
exports.tagRouter.get("/api/tag/%i/%i", NOT_IMPLEMENTED);
exports.tagRouter.head("/api/tag/%i", NOT_IMPLEMENTED);
exports.tagRouter.options("/api/tag/", NOT_IMPLEMENTED);
