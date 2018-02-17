"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
router.get("/api/skill/", NOT_IMPLEMENTED);
router.get("/api/skill/%i", NOT_IMPLEMENTED);
router.head("/api/skill/%i", NOT_IMPLEMENTED);
router.options("/api/skill/", NOT_IMPLEMENTED);
exports.default = router;
