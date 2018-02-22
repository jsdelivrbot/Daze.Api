"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.tagQueryType = new graphql_1.GraphQLObjectType({
    name: 'TagQueryType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        tagName: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        }
    }
});
