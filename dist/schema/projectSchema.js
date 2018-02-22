"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.projectQueryType = new graphql_1.GraphQLObjectType({
    name: 'ProjectQueryType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        projectName: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        description: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        url: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        publishedYear: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        }
    }
});
