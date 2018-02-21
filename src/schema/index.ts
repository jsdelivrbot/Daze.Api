import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
import { postQueryType } from './postSchema';

const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: postQueryType,
            description: 'post',
            resolve: () => ''
        },
        hello: {
            type: GraphQLString,
            description: 'desc',
            resolve: () => 'world',
        }
    }
});

export default new GraphQLSchema({
    query: rootQueryType
});
