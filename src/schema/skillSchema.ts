import { GraphQLObjectType, GraphQLString } from "graphql";

export const skillQueryType = new GraphQLObjectType({
    name: 'SkillQueryType',
    fields: {
        id: {
            type: GraphQLString,
            resolve() { }
        },
        skillName: {
            type: GraphQLString,
            resolve() { }
        },
        level: {
            type: GraphQLString,
            resolve() { }
        },
        focusArea: {
            type: GraphQLString,
            resolve() { }
        }
    }
});
