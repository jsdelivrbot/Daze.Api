import { GraphQLObjectType, GraphQLString } from "graphql";
import { Project } from "../domain";

export const ProjectType = new GraphQLObjectType({
    name: 'ProjectType',
    fields: {
        id: {
            type: GraphQLString
        },
        projectName: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        },
        publishedYear: {
            type: GraphQLString
        }
    }
});
