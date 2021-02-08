import { Grid, Box, Link } from "@material-ui/core";
import React from "react";

const datos: React.FC = (): JSX.Element => {
  return (
    <Grid container alignItems="center" justify="center" direction="column">
      <Grid item>
        <Link href="http://datos.salud.gob.ar/dataset/vacunas-contra-covid-19-dosis-aplicadas-en-la-republica-argentina">
          Vacunas aplicadas en Argentina
        </Link>
      </Grid>
      <Grid item>
        <Link href="https://sitioanterior.indec.gob.ar/nivel4_default.asp?id_tema_1=2&id_tema_2=24&id_tema_3=85">
          Población estimada 2021 por provincia
        </Link>
      </Grid>
    </Grid>
  );
};

export default datos;
