import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLUnionType, GraphQLInt, GraphQLNonNull, GraphQLResolveInfo } from "graphql";
import { PostType } from "./postType";
import { db } from "../persistance";
import { TagType } from "./tagType";
import { ProjectType } from "./projectType";

type PostsTypeArgs = {
    page: number
    pageSize: number
    slug?: string
}

export const RootType = new GraphQLObjectType({
    name: 'RootType',
    fields: {
        posts: {
            type: new GraphQLList(PostType),
            description: 'posts',
            args: {
                page: {
                    type: new GraphQLNonNull(GraphQLInt),
                    defaultValue: 1,
                    description: 'the offset number for the page starting at 1'
                },
                pageSize: {
                    type: new GraphQLNonNull(GraphQLInt),
                    defaultValue: 2,
                    description: 'the size limit for the page'
                },
                slug: {
                    type: GraphQLString
                },
            },
            async resolve(parent, args, { pool }) {
                const postsArgs = args as PostsTypeArgs;

                if (postsArgs.slug)
                    return [await db(pool).getPostBySlug(pool, postsArgs.slug)];
                else
                    return await db(pool).getPosts(pool, postsArgs.page, postsArgs.pageSize);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            description: 'projects',
            async resolve(parent, args, { pool }) {
                return await db(pool).getProjects(pool);
            }
        }
    }
});
