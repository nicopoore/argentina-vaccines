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
      <Stack>
        <Title />
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
    <Stack>
      <Title />
      <Stack direction="row" wrap={{ base: 'wrap', md: 'nowrap' }}>
        <DataContextProvider data={data?.data}>
          <SelectionContextProvider selectedProvince={selectedProvince}>
            <Map setSelectedProvince={setSelectedProvince} />
            <Data />
          </SelectionContextProvider>
        </DataContextProvider>
      </Stack>
    </Stack>
  );
};

export default Home;
