import React from "react";
import { useQuery, gql } from "@apollo/client";

const CURRENT_WEATHER = gql`
  query {
    currentWeather {
      city
      temperature
    }
  }
`;

const CurrentWeather = () => {
  const props = useQuery(CURRENT_WEATHER);

  const { loading, error, data } = props;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    currentWeather: { city, temperature },
  } = data;

  return (
    <div key={city}>
      <p>
        {city}: {(temperature - 273.15).toFixed(2)}
      </p>
    </div>
  );
};

export default CurrentWeather;
