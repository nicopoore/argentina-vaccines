// Dependencies
import React, { useState } from 'react';
import { Stack } from '@chakra-ui/react';

// Components
import { Map, Data, Title } from '../components';

// Utils
import { SelectionContextProvider } from '../utils/Context';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('Argentina');
  const [isSimplified, setIsSimplified] = useState(true);

  return (
    <Stack m="auto" w={{ base: '100%', xl: '80%' }}>
      <Title isSimplified={isSimplified} setIsSimplified={setIsSimplified} />
      <Stack direction="row" justify="space-between" wrap={{ base: 'wrap', md: 'nowrap' }}>
        <SelectionContextProvider selectedProvince={selectedProvince}>
          <Map setSelectedProvince={setSelectedProvince} />
          <Data isSimplified={isSimplified} />
        </SelectionContextProvider>
      </Stack>
    </Stack>
  );
};

export default Home;
