import { Map, Data, Title } from '../components';
import React, { useState } from 'react';
import SelectionContextProvider from '../utils/SelectionContext';
import { Stack } from '@chakra-ui/react';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('CABA');
  return (
    <Stack>
      <Title />
      <Stack direction="row">
        <SelectionContextProvider selectedProvince={selectedProvince}>
          <Map setSelectedProvince={setSelectedProvince} />
          <Data />
        </SelectionContextProvider>
      </Stack>
    </Stack>
    // <Box overflow="hidden">
    //   <Meta />
    //   <Grid container>
    //     <Title />
    //     <Map setTooltipContent={setContent} />
    //     <SelectionContextProvider selectedProvince={selectedProvince}>
    //       <DataCard />
    //     </SelectionContextProvider>
    //   </Grid>
    // </Box>
  );
};

export default Home;
