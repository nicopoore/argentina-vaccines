import React from "react";
import { Grid, Link, Typography } from "@material-ui/core";

const Title: React.FC = (): JSX.Element => {
  return (
    <Grid item>
      <Typography variant="h5">
        Vacunas Sputnik-V aplicadas por provincia
      </Typography>
      <Typography variant="subtitle1">
        Pasá el mouse por cada provincia para ver los datos
      </Typography>
      <Link href="/datos">Fuentes</Link>
    </Grid>
  );
};

export default Title;
