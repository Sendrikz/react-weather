import React from "react";
import { useQuery, gql } from "@apollo/client";

const CURRENT_WEATHER = gql`
  query GetCurrentWeather($city: String) {
    currentWeather(city: $city) {
      city
      temperature
    }
  }
`;

const CurrentWeather = () => {
  const props = useQuery(CURRENT_WEATHER, {
    variables: {
      city: "Smolensk",
    },
  });

  const { loading, error, data } = props;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    currentWeather: { city, temperature },
  } = data;

  return (
    <div key={city}>
      <p>
        {city}: {temperature}
      </p>
    </div>
  );
};

export default CurrentWeather;
