import { GraphQLSchema } from "graphql";
import { RootType } from './rootType';
import { PostType } from "./postType";
import { TagType } from "./tagType";
import { ProjectType } from "./projectType";
import { SkillType } from "./skillType";

export default new GraphQLSchema({
    types: [PostType, TagType, SkillType, ProjectType],
    query: RootType
});
