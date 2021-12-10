import { GraphQLScalarType, Kind } from 'graphql';

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
