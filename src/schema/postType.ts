import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { TagType } from "./tagType";
import { Post } from "../domain";

export const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: {
        id: {
            type: GraphQLString
        },
        slug: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString,
        },
        heroContent: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        },
        coverImage: {
            type: GraphQLString
        },
        createdAt: {
            type: GraphQLString
        },
        modifiedAt: {
            type: GraphQLString
        },
        tags: {
            type: new GraphQLList(TagType)
        }
    }
});
