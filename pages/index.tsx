import { Map, Data, Title } from '../components';
import React, { useState } from 'react';
import SelectionContextProvider from '../utils/Context/SelectionContext';
import { Stack, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import DataContextProvider from '../utils/Context/DataContext';

const Home = (): JSX.Element => {
  const [selectedProvince, setSelectedProvince] = useState('Argentina');

  const fetcher = async (url: string): Promise<any> =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    }).then(res => res.json());
  const { data, error } = useSWR('/api/data', fetcher);

  if (error)
    return (
      <Stack>
        <Text>Error al recolectar datos</Text>
        <Text>Error: {error.name}</Text>
        <Text>Message: {error.message}</Text>
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
