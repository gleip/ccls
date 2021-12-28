import { GraphQLScalarType, Kind } from 'graphql';
import { Credentials, RefreshTokenCredentials, UserCredentials } from '../domain/ports/output/authToolkit.service';

export const Void = new GraphQLScalarType({
  name: 'Void',
  description: 'Пустой тип значения',
  serialize: () => null,
  parseValue: () => null,
  parseLiteral: () => null,
});

export const customScalarDate = new GraphQLScalarType({
  name: 'Date',
  description: 'Дата',
  serialize: (value: Date) => value.toISOString(),
  parseValue: (value: string) => new Date(value),
  parseLiteral: ast => {
    if (ast.kind === Kind.STRING && Date.parse(ast.value)) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const isRefreshTokenCredentials = (credentials?: Credentials): credentials is RefreshTokenCredentials => {
  if (!credentials) {
    return false;
  }
  return !!(credentials as RefreshTokenCredentials).refreshKey;
};

export const isUserCredentials = (credentials?: Credentials): credentials is UserCredentials => {
  if (!credentials) {
    return false;
  }
  return !!(credentials as UserCredentials).id;
};
