import { GraphQLObjectType, GraphQLString } from "graphql";

export const SkillType = new GraphQLObjectType({
    name: 'SkillType',
    fields: {
        id: {
            type: GraphQLString
        },
        skillName: {
            type: GraphQLString
        },
        level: {
            type: GraphQLString
        },
        focusArea: {
            type: GraphQLString
        }
    }
});
