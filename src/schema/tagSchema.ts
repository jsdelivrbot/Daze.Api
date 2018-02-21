import { GraphQLObjectType, GraphQLString } from "graphql";

export const tagType = new GraphQLObjectType({
    name: 'TagQueryType',
    fields: {
        id: {
            type: GraphQLString,
            resolve: () => ''
        },
    }
});


