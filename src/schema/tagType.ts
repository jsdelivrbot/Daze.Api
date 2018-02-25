import { GraphQLObjectType, GraphQLString } from "graphql";

export const TagType = new GraphQLObjectType({
    name: 'TagType',
    fields: {
        id: {
            type: GraphQLString,
            resolve() { }
        },
        tagName: {
            type: GraphQLString,
            resolve() { }
        }
    }
});


