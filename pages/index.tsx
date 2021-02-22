import Head from 'next/head';
import { Grid, Box } from '@material-ui/core';
import { Map, DataCard, Title, SelectionContextProvider, TitleXs } from '../components';
import { useState } from 'react';

const Home = (): JSX.Element => {
  const [content, setContent] = useState('Ciudad de Buenos Aires');

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
            sm={4}
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Grid item>
              <TitleXs />
              <Title />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Map setTooltipContent={setContent} />
          </Grid>
          <Grid container item xs={false} sm={4} justify="center" direction="column">
            <Grid container item spacing={2}>
              <SelectionContextProvider selectedProvince={content}>
                <DataCard />
              </SelectionContextProvider>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
