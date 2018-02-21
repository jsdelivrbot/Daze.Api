"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var tagSchema_1 = require("./tagSchema");
exports.postQueryType = new graphql_1.GraphQLObjectType({
    name: 'PostQueryType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        slug: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        title: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        heroContent: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        content: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        coverImage: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        modifiedAt: {
            type: graphql_1.GraphQLString,
            resolve: function () { return ''; }
        },
        tags: {
            type: new graphql_1.GraphQLList(tagSchema_1.tagType),
            resolve: function () { return ''; }
        }
    }
});
