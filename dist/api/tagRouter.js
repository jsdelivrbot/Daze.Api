"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
router.get("/api/tag/", NOT_IMPLEMENTED);
router.get("/api/tag/%i", NOT_IMPLEMENTED);
router.get("/api/tag/%i/%i", NOT_IMPLEMENTED);
router.head("/api/tag/%i", NOT_IMPLEMENTED);
router.options("/api/tag/", NOT_IMPLEMENTED);
exports.default = router;
