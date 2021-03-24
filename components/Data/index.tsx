// Dependencies
import React, { useContext } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import useSWR from 'swr';

// Components
import BarChartsSection from './BarChartsSection';
import HistogramSection from './HistogramSection';
import NumbersSection from './NumbersSection';
import VaccineTypeSection from './VaccineTypeSection';

// Utils
import { MotionBox, MotionStack } from '../../utils/MotionComponents';
import { DataContextProvider, SelectionContext } from '../../utils/Context';
import { fetcher } from '../../utils/functions';

interface Props {
  isSimplified: boolean;
  testing?: boolean;
}

const Data: React.FC<Props> = (props): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const { data, error } = useSWR('/api/data', fetcher);
  const { data: historicData, error: historicDataError } = useSWR('/api/historic_data', fetcher);

  if (error)
    return (
      <Stack align="center" justifyContent="center" w={{ base: '100%', xl: '80%' }}>
        <Text>Error al buscar datos</Text>
        <Text>Error: {error.name}</Text>
        <Text>Mensaje: {error.message}</Text>
      </Stack>
    );

  return (
    <DataContextProvider data={data?.data}>
      <Stack alignItems="center" flexGrow={1} justify="center" overflow="hidden">
        <Stack
          alignItems="center"
          direction="row"
          justify="center"
          w={{ base: '100%', sm: '60%', '2xl': 'initial' }}
          wrap="wrap"
        >
          <AnimateSharedLayout>
            <MotionStack
              key="top-sections"
              layout
              direction="row"
              justify="center"
              mb={4}
              wrap="wrap"
            >
              <NumbersSection />
              <AnimatePresence>
                {!props.isSimplified ? (
                  <MotionStack
                    layout
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  >
                    <BarChartsSection />
                    {!props.testing ? (
                      <HistogramSection data={historicData} error={historicDataError} />
                    ) : null}
                  </MotionStack>
                ) : null}
              </AnimatePresence>
            </MotionStack>

            <MotionBox layout id="flexLineBreak" w="100%" />
            <AnimatePresence>
              {selectedProvince === 'Argentina' && !props.isSimplified ? (
                <VaccineTypeSection />
              ) : null}
            </AnimatePresence>
          </AnimateSharedLayout>
        </Stack>
      </Stack>
    </DataContextProvider>
  );
};

export default Data;
