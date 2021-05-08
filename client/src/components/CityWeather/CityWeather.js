import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const WEEK_DAYS = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat",
};

const parseTimeValue = (value) => (value < 10 ? `0${value}` : value);

const getDayString = (date) => {
  const weekDay = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedWeekDayName = WEEK_DAYS[weekDay];
  const formattedHours = parseTimeValue(hours);
  const formattedMinutes = parseTimeValue(minutes);

  return `${formattedWeekDayName}, ${formattedHours}:${formattedMinutes}`;
};

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
  const { loading, error, data } = useQuery(CITY_WEATHER, {
    variables: {
      city,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const {
    cityWeather: {
      city: cityName,
      temperature,
      date,
      weather: { description, iconCode },
    },
  } = data;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        style={{
          minWidth: "300px",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {cityName}
          </Typography>
          <Typography color="textSecondary">
            {getDayString(new Date(date))}
          </Typography>
          <Box display="flex">
            <Typography variant="h2" component="p">
              {temperature}
              <Typography
                variant="h4"
                component="sup"
                style={{ marginRight: "32px" }}
              >
                °C
              </Typography>
            </Typography>
            <img
              src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
              alt="weather"
              height="72px"
              width="72px"
            />
          </Box>
          <Typography variant="h5" component="div">
            {`${description[0].toUpperCase()}${description.slice(1)}`}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

CityWeather.propTypes = {
  city: PropTypes.string.isRequired,
};

export default CityWeather;
