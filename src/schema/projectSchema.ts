import { GraphQLObjectType, GraphQLString } from "graphql";

export const ProjectType = new GraphQLObjectType({
    name: 'ProjectType',
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
