import { config } from "dotenv";
import { ApolloServer, gql } from "apollo-server";
import axios from "axios";
config();

const typeDefs = gql`
  type CurrentWeather {
    city: String
    temperature: Float
  }

  type Query {
    currentWeather(city: String): CurrentWeather
  }
`;

const resolvers = {
  Query: {
    currentWeather: async (parent, args) => {
      const { data = {} } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${args.city}&appid=${process.env.API_KEY}`
      );

      return {
        temperature: (data.main.temp - 273.15).toFixed(2),
        city: data.name,
      };
    },
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
