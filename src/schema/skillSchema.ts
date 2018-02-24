import { GraphQLObjectType, GraphQLString } from "graphql";

export const SkillType = new GraphQLObjectType({
    name: 'SkillType',
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
