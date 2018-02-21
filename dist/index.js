"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var apiConfig_1 = require("./apiConfig");
var schema_1 = require("./schema");
var graphqlHTTP = require("express-graphql");
var env = process.env.NODE_ENV;
var PORT = +(process.env.PORT || '8080');
var HOST_NAME = env == 'production' ? '0.0.0.0' : '127.0.0.1';
var app = express();
var router = express.Router();
router.use(apiConfig_1.defaultCors);
router.options('*', apiConfig_1.defaultCors);
app.use('/graphql', graphqlHTTP({
    schema: schema_1.default,
    graphiql: true,
    pretty: true
}));
app.all('*', function (req, res) {
    return res.end('NOT FOUND');
});
app.get('/', function (req, res) {
    res.end('__daze_api__');
});
// const NOT_IMPLEMENTED = (req: express.Request, res: express.Response) => {
//     res.end('NOT IMPLEMENTED');
// };
// app.post("/api/login/", NOT_IMPLEMENTED);
// app.use('/api/post', postRouter);
// app.use('/api/tag', tagRouter);
// app.use('/api/skill', skillRouter);
// app.use('/api/project', projectRouter);
var server = app.listen(PORT, HOST_NAME, function () {
    console.log("Server is listening at http://" + HOST_NAME + ":" + PORT);
});
