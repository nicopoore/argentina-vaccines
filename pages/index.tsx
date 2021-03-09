import { Map, Data, Title } from '../components';
import React, { useEffect, useState } from 'react';
import SelectionContextProvider from '../utils/Context/SelectionContext';
import { Stack, Text } from '@chakra-ui/react';
import useSWR, { mutate } from 'swr';
import DataContextProvider from '../utils/Context/DataContext';
import { fetcher, postCurrentData } from '../utils/functions';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('Argentina');

  const { data, error } = useSWR('/api/data', fetcher);

  if (error)
    return (
      <Stack>
        <Text>Error al recolectar datos</Text>
        <Text>Error: {error.name}</Text>
        <Text>Message: {error.message}</Text>
      </Stack>
    );

  useEffect(() => {
    const postDataAndMutate = async (): Promise<void> => {
      await postCurrentData();
      mutate('/api/historic_data');
    };

    postDataAndMutate();
  }, []);

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
