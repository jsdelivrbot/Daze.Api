import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLUnionType } from "graphql";
import { PostType } from "./postType";
import { Db } from "../persistance";
import { TagType } from "./tagType";
import { ProjectType } from "./projectType";

export const RootType = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            description: 'posts',
            args: {
                slug: { type: GraphQLString }
            },
            async resolve(root, args) {
                if (args.slug)
                    return [await Db.posts.getPostBySlug(args.slug)];
                else
                    return await Db.posts.getPosts();
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            description: 'projects',
            async resolve() {
                return await Db.projects.getProjects();
            }
        },
        hello: {
            type: GraphQLString,
            description: 'desc',
            resolve() { }
        }
    }
});
