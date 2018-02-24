"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var tagSchema_1 = require("./tagSchema");
exports.PostType = new graphql_1.GraphQLObjectType({
    name: 'PostType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.id;
            }
        },
        slug: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.slug;
            }
        },
        title: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.title;
            }
        },
        heroContent: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.hero_content;
            }
        },
        content: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.content;
            }
        },
        coverImage: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.cover_image;
            }
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.created_at;
            }
        },
        modifiedAt: {
            type: graphql_1.GraphQLString,
            resolve: function (post) {
                return post.modified_at;
            }
        },
        tags: {
            type: new graphql_1.GraphQLList(tagSchema_1.TagType),
            resolve: function (post) {
            }
        }
    }
});
