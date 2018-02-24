"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var rootSchema_1 = require("./rootSchema");
var postSchema_1 = require("./postSchema");
var tagSchema_1 = require("./tagSchema");
var projectSchema_1 = require("./projectSchema");
var skillSchema_1 = require("./skillSchema");
exports.default = new graphql_1.GraphQLSchema({
    types: [postSchema_1.PostType, tagSchema_1.TagType, skillSchema_1.SkillType, projectSchema_1.ProjectType],
    query: rootSchema_1.RootType
});
