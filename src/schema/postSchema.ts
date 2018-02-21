import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { tagType } from "./tagSchema";


export const postQueryType = new GraphQLObjectType({
    name: 'PostQueryType',
    fields: {
        id: {
            type: GraphQLString,
            resolve: () => ''
        },
        slug: {
            type: GraphQLString,
            resolve: () => ''
        },
        title: {
            type: GraphQLString,
            resolve: () => ''
        },
        heroContent: {
            type: GraphQLString,
            resolve: () => ''
        },
        content: {
            type: GraphQLString,
            resolve: () => ''
        },
        coverImage: {
            type: GraphQLString,
            resolve: () => ''
        },
        createdAt: {
            type: GraphQLString,
            resolve: () => ''
        },
        modifiedAt: {
            type: GraphQLString,
            resolve: () => ''
        },
        tags: {
            type: new GraphQLList(tagType),
            resolve: () => ''
        }
    }
});
