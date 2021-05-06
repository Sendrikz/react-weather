import { ApolloServer, gql } from "apollo-server";
import { weatherSample } from "./weather.js";

const typeDefs = gql`
  type CurrentWeather {
    city: String
    temperature: Float
  }

  type Query {
    currentWeather: CurrentWeather
  }
`;

const resolvers = {
  Query: {
    currentWeather: () => ({
      temperature: weatherSample.main.temp,
      city: weatherSample.name,
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: { credentials: true, origin: "http://localhost:3000" },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
