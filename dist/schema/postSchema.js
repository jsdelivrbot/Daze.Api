"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var tagSchema_1 = require("./tagSchema");
exports.postQueryType = new graphql_1.GraphQLObjectType({
    name: 'PostQueryType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        slug: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        title: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        heroContent: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        content: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        coverImage: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        modifiedAt: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        tags: {
            type: new graphql_1.GraphQLList(tagSchema_1.tagQueryType),
            resolve: function () { }
        }
    }
});
