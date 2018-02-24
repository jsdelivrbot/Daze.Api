import { GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import { TagType } from "./tagSchema";

export const PostType = new GraphQLObjectType({
    name: 'PostType',
    fields: {
        id: {
            type: GraphQLString,
            resolve(post) {
                return post.id;
            }
        },
        slug: {
            type: GraphQLString,
            resolve(post) {
                return post.slug;
            }
        },
        title: {
            type: GraphQLString,
            resolve(post) {
                return post.title;
            }
        },
        heroContent: {
            type: GraphQLString,
            resolve(post) {
                return post.hero_content;
            }
        },
        content: {
            type: GraphQLString,
            resolve(post) {
                return post.content;
            }
        },
        coverImage: {
            type: GraphQLString,
            resolve(post) {
                return post.cover_image;
            }
        },
        createdAt: {
            type: GraphQLString,
            resolve(post) {
                return post.created_at;
            }
        },
        modifiedAt: {
            type: GraphQLString,
            resolve(post) {
                return post.modified_at;
            }
        },
        tags: {
            type: new GraphQLList(TagType),
            resolve(post) {
            }
        }
    }
});
