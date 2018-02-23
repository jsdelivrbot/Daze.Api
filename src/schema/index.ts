import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
import { postQueryType } from './postSchema';
import { tagQueryType } from './tagSchema';
import { projectQueryType } from './projectSchema';
import { Db } from '../persistance';

const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        posts: {
            type: new GraphQLList(postQueryType),
            description: 'post',
            async resolve() {
                return await Db.posts.getPosts();
            }
        },
        tags: {
            type: new GraphQLList(tagQueryType),
            description: 'tag',
            resolve() { }
        },
        projects: {
            type: new GraphQLList(projectQueryType),
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

export default new GraphQLSchema({
    query: rootQueryType
});
