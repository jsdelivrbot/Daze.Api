"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var postSchema_1 = require("./postSchema");
var rootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: postSchema_1.postQueryType,
            description: 'post',
            resolve: function () { return ''; }
        },
        hello: {
            type: graphql_1.GraphQLString,
            description: 'desc',
            resolve: function () { return 'world'; },
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: rootQueryType
});
