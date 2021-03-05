import { Stack, Text } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import BarChartsSection from './BarChartsSection';
import NumbersSection from './NumbersSection';

const Data: React.FC = (): JSX.Element => {
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
    <Stack alignItems="center" flexGrow={1} justify="center">
      <Stack direction="row">
        <NumbersSection data={data ? data.data : 'loading'} />
        <BarChartsSection data={data ? data.data : 'loading'} />
      </Stack>
      <Stack direction="row">
        <Stack h={300} w={300} />
        <Stack h={300} w={300} />
      </Stack>
    </Stack>
  );
};

export default Data;
