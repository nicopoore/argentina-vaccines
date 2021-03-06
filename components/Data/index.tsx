import { Flex, Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useContext } from 'react';
import useSWR from 'swr';
import MotionBox from '../../utils/MotionBox';
import MotionStack from '../../utils/MotionStack';
import { SelectionContext } from '../../utils/SelectionContext';
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

  const selectedProvince = useContext(SelectionContext);

  return (
    <Stack alignItems="center" flexGrow={1} justify="center" overflow="hidden">
      <Stack alignItems="center" direction="row" justify="center" wrap="wrap">
        <AnimateSharedLayout>
          <MotionStack key="top-sections" layout direction="row" mb={6}>
            <NumbersSection data={data ? data.data : 'loading'} />
            <MotionStack layout>
              <BarChartsSection data={data ? data.data : 'loading'} />
              <Flex bgColor="gray.900" direction="column" grow={1} minH={200} minW={300} w="100%" />
            </MotionStack>
          </MotionStack>

          <MotionBox layout id="flexLineBreak" w="100%" />
          <AnimatePresence>
            {selectedProvince === 'Argentina' && (
              <VaccineTypeSection data={data ? data.data : 'loading'} />
            )}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Stack>
    </Stack>
  );
};

export default Data;
