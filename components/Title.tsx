import React from "react";
import { Grid, Link, Typography } from "@material-ui/core";

const Title: React.FC = (): JSX.Element => {
  return (
    <Grid item>
      <Typography variant="h5">
        Vacunas Sputnik-V aplicadas por provincia
      </Typography>
      <Typography variant="subtitle1">
        Tocá o pasá el mouse por cada provincia para ver los datos
      </Typography>
      <Typography>
        <Link
          href="https://github.com/nicopoore/argentina-vaccines"
          target="_blank"
          rel="noreferrer"
        >
          Creado por Nicolás Poore
        </Link>
      </Typography>
      <Typography>
        <Link href="/datos">Fuentes</Link>
      </Typography>
    </Grid>
  );
};

export default Title;
