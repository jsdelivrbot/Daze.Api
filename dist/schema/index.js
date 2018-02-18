"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var rootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: graphql_1.GraphQLString,
            description: 'desc',
            resolve: function () { return 'world'; },
        }
    }
});
var schema = new graphql_1.GraphQLSchema({
    query: rootQueryType
});
exports.default = schema;
