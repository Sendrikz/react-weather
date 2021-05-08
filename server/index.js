import { config } from "dotenv";
import { ApolloServer, gql, makeExecutableSchema } from "apollo-server";
import axios from "axios";
import { GraphQLScalarType, Kind } from "graphql";
config();

const LANGUAGE_SETTING = "en";

const typeDefs = gql`
  scalar Date

  type Weather {
    description: String!
    iconCode: String!
  }

  type CityWeather {
    city: String!
    temperature: Float!
    date: Date!
    weather: Weather!
  }

  type Query {
    cityWeather(city: String!, date: Date): CityWeather
  }
`;

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

const resolvers = {
  Query: {
    cityWeather: async (parent, args) => {
      const { data = {} } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${args.city}&appid=${process.env.API_KEY}&lang=${LANGUAGE_SETTING}`
      );
      return {
        city: data.name,
        temperature: (data.main.temp - 273.15).toFixed(2),
        date: new Date(),
        weather: {
          description: data.weather[0].description,
          iconCode: data.weather[0].icon,
        },
      };
    },
  },
  Date: dateScalar,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  cors: { credentials: true, origin: "http://localhost:3000" },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
