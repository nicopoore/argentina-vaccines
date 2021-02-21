import { Box, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { SelectionContext } from "../SelectionContext";
import VaccineNumbers from "./VaccineNumbers";

const VaccineCard: React.FC<{ place: "country" | "province"; dose: 1 | 2 }> = (
  props
): JSX.Element => {
  return (
    <Box my={2}>
      <Grid item style={{ minWidth: 350 }}>
        <Typography variant="h6">
          {props.dose === 1 ? "Primera dosis" : "Ambas dosis"}
        </Typography>

        <VaccineNumbers place={props.place} dose={props.dose} />
      </Grid>
    </Box>
  );
};

export default VaccineCard;
