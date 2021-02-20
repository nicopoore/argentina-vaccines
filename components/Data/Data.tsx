import React, { useContext } from "react";
import { Typography, Grid } from "@material-ui/core";
import { SelectionContext } from "../SelectionContext";
import PopulationNumbers from "./PopulationNumbers";
import VaccineNumbers from "./VaccineNumbers";

const Data: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  return (
    <>
      <Grid container item xs={6} sm={12}>
        <Grid item>
          <Typography variant="h6">
            {selectedProvince === "Ciudad de Buenos Aires"
              ? "CABA"
              : selectedProvince}
          </Typography>
          <VaccineNumbers place="province" />
          <PopulationNumbers place="province" />
        </Grid>
      </Grid>
      <Grid container item xs={6} sm={12}>
        <Grid item>
          <Typography variant="h6">Argentina (total)</Typography>
          <VaccineNumbers place="country" />
          <PopulationNumbers place="country" />
        </Grid>
      </Grid>
    </>
  );
};

export default Data;
