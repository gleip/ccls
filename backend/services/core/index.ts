import { ApolloServer, AuthenticationError, UserInputError } from 'apollo-server';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { customScalarDate, isRefreshTokenCredentials, isUserCredentials, Void } from './helpers';
import { container, TYPES } from './inversify.config';
import { DomainLogicDatasource } from './datasources/core.datasource';
import * as path from 'path';
import { Resolvers, User } from './schemas/graphqlApiTypes';

import type { LoggerService } from 'common/Logger/LoggerService.interface';
import type { CoreRepository } from './domain/ports/output/core.repository';
import type { AuthToolkitService, Credentials } from './domain/ports/output/authToolkit.service';

interface Context {
  dataSources: {
    domain: DomainLogicDatasource;
  };
  credentials?: Credentials;
}

(async () => {
  const logger = container.get<LoggerService>(TYPES.LoggerService);
  const repository = container.get<CoreRepository>(TYPES.CoreRepository);
  try {
    const resolvers: Resolvers<Context> = {
      Mutation: {
        register: (_, args, { dataSources }) => {
          return dataSources.domain.register(args.registerUserCommand);
        },
        signIn: (_, args, context) => {
          return context.dataSources.domain.signIn(args.signInCommand);
        },
        refreshUserAuth: (_, args, { dataSources, credentials }) => {
          if (!isRefreshTokenCredentials(credentials)) {
            throw new AuthenticationError('');
          }
          return dataSources.domain.refreshUserToken(credentials);
        },
        sendVerificationCode(_, args, { dataSources, credentials }) {
          if (!isUserCredentials(credentials)) {
            throw new AuthenticationError('');
          }
          return dataSources.domain.sendUserVerificationCode({ id: credentials.id });
        },
        changeUserPassword(_, args, { dataSources, credentials }) {
          if (!isUserCredentials(credentials)) {
            throw new AuthenticationError('');
          }
          if (args.changePasswordCommand.verificationCode === '') {
            throw new UserInputError('Код подтверждения не может быть пустым');
          }
          return dataSources.domain.changeUserPassword({ id: credentials.id, ...args.changePasswordCommand });
        },
        changeUserEmail(parent, args, { dataSources, credentials }) {
          if (!isUserCredentials(credentials)) {
            throw new AuthenticationError('');
          }
          if (args.changeEmailCommand.verificationCode === '') {
            throw new UserInputError('Код подтверждения не может быть пустым');
          }
          return dataSources.domain.changeUserEmail({ id: credentials.id, ...args.changeEmailCommand });
        },
        updateUser(parent, args, { dataSources, credentials }) {
          if (!isUserCredentials(credentials)) {
            throw new AuthenticationError('');
          }
          return dataSources.domain.updateUser({ id: credentials.id, ...args.updateUserCommand }) as any;
        },
      },
      User: {
        space: (user: Omit<User, 'space'> & { space: string | null }, args, { dataSources }) => {
          if (!user.space) {
            return null;
          }
          return dataSources.domain.get
        }
      },
      Date: customScalarDate,
      Void,
    };
    const schema = loadSchemaSync(path.resolve(__dirname, 'schemas', '**', '*.graphql'), {
      loaders: [new GraphQLFileLoader()],
      resolvers,
    });

    await repository.connect();
    const server = new ApolloServer({
      schema,
      resolvers,
      dataSources: () => ({
        domain: new DomainLogicDatasource(container.get(TYPES.UserService)),
      }),
      context: async ({ req }) => {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
          const token = authorizationHeader.split(' ')[1];
          const authToolkit = container.get<AuthToolkitService>(TYPES.AuthService);
          const credentials = await authToolkit.verifyJwtToken(token).catch(error => null);
          if (credentials) {
            return { credentials };
          }
        }
        return;
      },
    });

    server.listen().then(({ url }) => {
      logger.info(`🚀  Server ready at ${url}`);
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
})();
