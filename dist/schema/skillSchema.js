"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.SkillType = new graphql_1.GraphQLObjectType({
    name: 'SkillType',
    fields: {
        id: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        skillName: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        level: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        },
        focusArea: {
            type: graphql_1.GraphQLString,
            resolve: function () { }
        }
    }
});
