import { gql } from "apollo-server";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar type",
  serialize: (value) => value.getTime(),
  parseValue: (value) => new Date(value),
  parseLiteral: (ast) => {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
});

export const typeDefs = gql`
  scalar Date
`;

export const resolvers = {
  Date: dateScalar,
};
