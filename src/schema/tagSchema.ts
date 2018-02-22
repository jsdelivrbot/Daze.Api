import { GraphQLObjectType, GraphQLString } from "graphql";

export const tagQueryType = new GraphQLObjectType({
    name: 'TagQueryType',
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


