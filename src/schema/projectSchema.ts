import { GraphQLObjectType, GraphQLString } from "graphql";

export const projectQueryType = new GraphQLObjectType({
    name: 'ProjectQueryType',
    fields: {
        id: {
            type: GraphQLString,
            resolve() { }
        },
        projectName: {
            type: GraphQLString,
            resolve() { }
        },
        description: {
            type: GraphQLString,
            resolve() { }
        },
        url: {
            type: GraphQLString,
            resolve() { }
        },
        publishedYear: {
            type: GraphQLString,
            resolve() { }
        }
    }
});
