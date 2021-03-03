import { Grid, Box } from '@material-ui/core';
import { Meta, Map, DataCard, Title } from '../components';
import React, { useState } from 'react';
import SelectionContextProvider from '../utils/SelectionContext';

const Home = (): JSX.Element => {
  const [content, setContent] = useState('CABA');
  const selectedProvince = content === 'Ciudad de Buenos Aires' ? 'CABA' : content;
  return (
    <Box overflow="hidden">
      <Meta />
      <Grid container>
        <Title />
        <Map setTooltipContent={setContent} />
        <SelectionContextProvider selectedProvince={selectedProvince}>
          <DataCard />
        </SelectionContextProvider>
      </Grid>
    </Box>
  );
};

export default Home;
