import { Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import useSWR from 'swr';
import BarChartsSection from './BarChartsSection';
import NumbersSection from './NumbersSection';
import VaccineTypeSection from './VaccineTypeSection';

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
      <Stack alignItems="center" direction="row" justify="center" wrap="wrap">
        <Stack direction="row">
          <NumbersSection data={data ? data.data : 'loading'} />
          <Stack>
            <BarChartsSection data={data ? data.data : 'loading'} />
            <Flex bgColor="gray.900" direction="column" grow={1} minH={10} w={300} />
          </Stack>
        </Stack>

        <Stack id="flexLineBreak" mb={8} width="100%" />
        <VaccineTypeSection data={data ? data.data : 'loading'} />
      </Stack>
    </Stack>
  );
};

export default Data;
