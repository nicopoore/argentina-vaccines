// Dependencies
import React, { useEffect, useState } from 'react';
import { Stack } from '@chakra-ui/react';
import { mutate } from 'swr';

// Components
import { Map, Data, Title } from '../components';

// Utils
import { postCurrentData } from '../utils/functions';
import { SelectionContextProvider } from '../utils/Context';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('Argentina');
  const [isSimplified, setIsSimplified] = useState(true);

  const postDataAndMutate = async (): Promise<void> => {
    await postCurrentData();
    mutate('/api/historic_data');
  };

  useEffect(() => {
    postDataAndMutate();
  }, []);

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
