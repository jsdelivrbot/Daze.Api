import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

const rootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            description: 'desc',
            resolve: () => 'world',
        }
    }
});

const schema = new GraphQLSchema({
    query: rootQueryType
});

export default schema;
