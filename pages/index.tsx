import Head from 'next/head';
import { Grid, Box } from '@material-ui/core';
import { Map, DataCard, Title, SelectionContextProvider, TitleXs } from '../components';
import { useState } from 'react';

const Home = (): JSX.Element => {
  const [content, setContent] = useState('CABA');
  const selectedProvince = content === 'Ciudad de Buenos Aires' ? 'CABA' : content;
  return (
    <>
      <Head>
        <title>Argentina Vacunada</title>
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box overflow="hidden">
        <Grid container>
          <Grid container item alignItems="center" justify="flex-end" sm={4} xs={false}>
            <TitleXs />
            <Title />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Map setTooltipContent={setContent} />
          </Grid>
          <Grid container item alignItems="center" sm={4} xs={false}>
            <Grid container item spacing={2}>
              <SelectionContextProvider selectedProvince={selectedProvince}>
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
