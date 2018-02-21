"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.tagType = new graphql_1.GraphQLObjectType({
    name: 'TagQueryType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
    }
});
