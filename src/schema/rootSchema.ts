import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLUnionType } from "graphql";
import { PostType } from "./postSchema";
import { Db } from "../persistance";
import { TagType } from "./tagSchema";
import { ProjectType } from "./projectSchema";

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
                console.log('slug', args.slug);
                if (args.slug)
                    return await Db.posts.getPostBySlug(args.slug);
                else
                    return await Db.posts.getPosts();
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            description: 'tag',
            resolve() { }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            description: 'project',
            resolve() { }
        },
        hello: {
            type: GraphQLString,
            description: 'desc',
            resolve() { }
        }
    }
});
