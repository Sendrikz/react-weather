import React from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import CityWeatherCard from "components/CityWeatherCard";

const CITY_WEATHER = gql`
  query GetCityWeather($city: String!, $date: Date) {
    cityWeather(city: $city, date: $date) {
      city
      temperature
      date
      weather {
        description
        iconCode
      }
    }
  }
`;

const CityWeather = ({ city }) => {
  const { loading: isLoading, error, data = {} } = useQuery(CITY_WEATHER, {
    variables: {
      city,
    },
  });

  if (error) return <p>Error :(</p>;

  const {
    cityWeather: {
      city: cityName,
      temperature,
      date,
      weather: { description, iconCode } = {},
    } = {},
  } = data;

  return (
    <CityWeatherCard
      isLoading={isLoading}
      cityName={cityName}
      date={date ? new Date(date) : new Date()}
      temperature={temperature}
      statusCode={iconCode}
      description={description}
    />
  );
};

CityWeather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default CityWeather;
