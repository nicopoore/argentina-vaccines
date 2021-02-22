import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { VaccineNumbers } from "..";
import { VaccineDataItem } from "../types";

interface VaccineCardProps {
  place: "country" | "province";
  dose: 1 | 2;
  data: VaccineDataItem[] | "loading";
  formatVaccineData: (data: VaccineDataItem[]) => [number, number];
}

const VaccineCard: React.FC<VaccineCardProps> = (props): JSX.Element => {
  return (
    <Box my={1}>
      <Grid item style={{ minWidth: 350 }}>
        <Typography variant="h6">
          {props.dose === 1 ? "Primera dosis" : "Ambas dosis"}
        </Typography>
        <Grid container>
          {["raw", "percentage"].map((numberType: "raw" | "percentage") => (
            <Grid item xs={6} key={numberType}>
              <VaccineNumbers
                place={props.place}
                dose={props.dose}
                numberType={numberType}
                data={props.data}
                formatVaccineData={props.formatVaccineData}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VaccineCard;
