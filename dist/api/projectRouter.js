"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var NOT_IMPLEMENTED = function (req, res) {
    res.end('NOT IMPLEMENTED');
};
router.get("/api/project/", function (req, res) { });
router.get("/api/project/%i", NOT_IMPLEMENTED);
router.head("/api/project/%i", NOT_IMPLEMENTED);
router.options("/api/project/", NOT_IMPLEMENTED);
exports.default = router;
