import { gql } from "apollo-server";
import axios from "axios";

const LANGUAGE_SETTING = "en";

export const typeDefs = gql`
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

  extend type Query {
    cityWeather(city: String!, date: Date): CityWeather
  }
`;

export const resolvers = {
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
};
