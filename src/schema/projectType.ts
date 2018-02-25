import { GraphQLObjectType, GraphQLString } from "graphql";
import { Project } from "../domain";

export const ProjectType = new GraphQLObjectType({
    name: 'ProjectType',
    fields: {
        id: {
            type: GraphQLString,
            resolve(project: Project) {
                return project.id;
            }
        },
        projectName: {
            type: GraphQLString,
            resolve(project: Project) {
                return project.name;
            }
        },
        description: {
            type: GraphQLString,
            resolve(project: Project) {
                return project.description;
            }
        },
        url: {
            type: GraphQLString,
            resolve(project: Project) {
                return project.url;
            }
        },
        publishedYear: {
            type: GraphQLString,
            resolve(project: Project) {
                return project.published_year;
            }
        }
    }
});
