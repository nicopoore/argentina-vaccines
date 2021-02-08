import Head from "next/head";
import { Grid, Box } from "@material-ui/core";
import { Map, Data, Title } from "../components";
import { useState } from "react";

const Home = (): JSX.Element => {
  const [content, setContent] = useState("Ciudad de Buenos Aires");

  return (
    <>
      <Head>
        <title>Argentina Vacunada</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box overflow="hidden">
        <Grid container item justify="space-between" spacing={0}>
          <Grid
            container
            item
            xs={false}
            sm={3}
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Title />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Map setTooltipContent={setContent} />
          </Grid>
          <Grid
            container
            item
            xs={false}
            sm={3}
            justify="center"
            direction="column"
          >
            <Grid container item spacing={2}>
              <Data content={content} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
