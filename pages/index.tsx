// Dependencies
import React, { useEffect, useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';

// Components
import { Map, Data, Title } from '../components';

// Utils
import { fetcher, postCurrentData } from '../utils/functions';
import { SelectionContextProvider, DataContextProvider } from '../utils/Context';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('Argentina');
  const [isSimplified, setIsSimplified] = useState(true);

  const { data, error } = useSWR('/api/data', fetcher);

  useEffect(() => {
    const postDataAndMutate = async (): Promise<void> => {
      await postCurrentData();
      mutate('/api/historic_data');
    };

    postDataAndMutate();
  }, []);

  if (error)
    return (
      <Stack m="auto" w={{ base: '100%', xl: '80%' }}>
        <Title isSimplified={isSimplified} setIsSimplified={setIsSimplified} />
        <Stack direction="row" wrap={{ base: 'wrap', md: 'nowrap' }}>
          <SelectionContextProvider selectedProvince={selectedProvince}>
            <Map setSelectedProvince={setSelectedProvince} />
          </SelectionContextProvider>
          <Stack alignItems="center" flexGrow={1} justify="center">
            <Text>Error al buscar datos</Text>
            <Text>Error: {error.name}</Text>
            <Text>Mensaje: {error.message}</Text>
          </Stack>
        </Stack>
      </Stack>
    );

  return (
    <Stack m="auto" w={{ base: '100%', xl: '80%' }}>
      <Title isSimplified={isSimplified} setIsSimplified={setIsSimplified} />
      <Stack direction="row" justify="space-between" wrap={{ base: 'wrap', md: 'nowrap' }}>
        <DataContextProvider data={data?.data}>
          <SelectionContextProvider selectedProvince={selectedProvince}>
            <Map setSelectedProvince={setSelectedProvince} />
            <Data isSimplified={isSimplified} />
          </SelectionContextProvider>
        </DataContextProvider>
      </Stack>
    </Stack>
  );
};

export default Home;
