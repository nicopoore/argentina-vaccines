import { Grid, Link, Box } from "@material-ui/core";
import React from "react";
import Head from "next/head";

const datos: React.FC = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Argentina Vacunada</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Grid container alignItems="center" direction="column">
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
    </>
  );
};

export default datos;
