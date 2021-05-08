import React from "react";
import CityWeather from "components/CityWeather";
import { Grid } from "@material-ui/core";

const App = () => {
  return (
    <Grid container spacing={4}>
      <Grid item>
        <CityWeather city="Smolensk" />
      </Grid>
      <Grid item>
        <CityWeather city="Moscow" />
      </Grid>
      <Grid item>
        <CityWeather city="Kiev" />
      </Grid>
    </Grid>
  );
};

export default App;
