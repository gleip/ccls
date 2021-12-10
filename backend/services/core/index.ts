import { ApolloServer } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { customScalarDate, Void } from './helpers';

const resolvers = {
  Mutation: {
    register: (parent: any, args: any, context: any, info: any) => {
      console.log('in handler!', args);
      return args.newUser;
    },
  },
  Date: customScalarDate,
  Void
};

const schema = loadSchemaSync('./schemas/**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
  resolvers,
});

const server = new ApolloServer({ schema, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
