import React, { useContext } from "react";
import { Typography, Grid, Card, CardContent } from "@material-ui/core";
import { SelectionContext } from "../SelectionContext";
import PopulationNumbers from "./PopulationNumbers";
import VaccineNumbers from "./VaccineNumbers";
import VaccineCard from "./VaccineCard";

const Data: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const provinceName =
    selectedProvince === "Ciudad de Buenos Aires" ? "CABA" : selectedProvince;
  const places = ["province", "country"];
  const doses = [1, 2];

  return (
    <>
      {places.map((place: "province" | "country") => (
        <Grid container item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">
                {place === "country" ? "Argentina" : provinceName}
              </Typography>
              {doses.map((dose: 1 | 2) => (
                <VaccineCard place={place} dose={dose} />
              ))}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default Data;
