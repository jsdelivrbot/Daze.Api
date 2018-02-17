"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var persistance_1 = require("../persistance");
var express = require("express");
var createHal = function () { };
var router = express.Router();
// "/api/post/"11
router.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var posts, links, hal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, persistance_1.Db.posts.getPosts()];
            case 1:
                posts = _a.sent();
                links = {
                    Self: { href: '/api/post/2' },
                    Next: { href: '/api/post/2/2' }
                };
                hal = {
                    totalCount: posts.length,
                    _links: links,
                    _embedded: posts
                };
                return [2 /*return*/, res.json(hal)];
        }
    });
}); });
// "/api/post/%i/%i"
exports.getPaginated = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, page, pageSize, posts;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, page = _a.page, pageSize = _a.pageSize;
                return [4 /*yield*/, persistance_1.Db.posts.getPostsPaginated(page, pageSize)];
            case 1:
                posts = _b.sent();
                return [2 /*return*/];
        }
    });
}); };
// "/api/post/%i"
exports.getSingle = function (req, res) {
    return res.json();
};
// "/api/post/slug/%s"
exports.getSingleBySlug = function () { };
// "/api/post/%i/tag"
exports.getPostTags = function () { };
// "/api/post/%i"
exports.head = function () { };
// "/api/post/" 
exports.asyncOptions = function () { };
var NOT_IMPLEMENTED = function (req, res) {
    return res.end('NOT IMPLEMENTED');
};
router.get("/api/post/:id", exports.getSingle);
router.get("/api/post/slug/%s", NOT_IMPLEMENTED);
router.get("/api/post/%i/tag", NOT_IMPLEMENTED);
router.get("/api/post/%i/%i", NOT_IMPLEMENTED);
router.head("/api/post/%i", NOT_IMPLEMENTED);
router.options("/api/post/", NOT_IMPLEMENTED);
exports.default = router;
