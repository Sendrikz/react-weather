import { gql, makeExecutableSchema } from "apollo-server";
import merge from "lodash/merge.js";
import {
  typeDefs as CityWeather,
  resolvers as CityWeatherResolvers,
} from "./cityWeather.js";
import {
  typeDefs as DateScalar,
  resolvers as DateScalarResolvers,
} from "./scalars/date.js";

const Query = gql`
  type Query {
    _empty: String
  }
`;

const resolvers = {};

export default makeExecutableSchema({
  typeDefs: [Query, CityWeather, DateScalar],
  resolvers: merge(resolvers, CityWeatherResolvers, DateScalarResolvers),
});
