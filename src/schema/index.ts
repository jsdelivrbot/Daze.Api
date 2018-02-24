import { GraphQLSchema } from "graphql";
import { RootType } from './rootSchema';
import { PostType } from "./postSchema";
import { TagType } from "./tagSchema";
import { ProjectType } from "./projectSchema";
import { SkillType } from "./skillSchema";

export default new GraphQLSchema({
    types: [PostType, TagType, SkillType, ProjectType],
    query: RootType
});
