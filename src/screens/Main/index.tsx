// Dependencies
import React, { useContext, useMemo } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import useSWR from 'swr';

// Components
import {
  BarChartsSection,
  HistogramSection,
  NumbersSection,
  VaccineTypeSection,
} from 'components/sections';
import { Map, Title } from 'components';

// Utils
import { MotionBox, MotionStack } from 'utils/MotionComponents';
import { DataContextProvider, SelectionContext, SelectionContextProvider } from 'utils/Context';
import { fetcher, getProvinceNo } from 'utils/functions';

interface DataProps {
  isSimplified: boolean;
  testing?: boolean;
}

const Data: React.FC<DataProps> = (props): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const { data, error } = useSWR('/api/data', fetcher);
  const { data: newHistoricData, error: historicDataError } = useSWR(
    `/api/historic_data/${getProvinceNo(selectedProvince)}`,
    fetcher
  );

  const historicData = useMemo(() => newHistoricData?.slice(), [selectedProvince, newHistoricData]);

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

interface Props {
  isSimplified: boolean;
  setIsSimplified: (_: boolean) => void;
  selectedProvince: string;
  setSelectedProvince: (_: string) => void;
}

const MainScreen: React.FC<Props> = ({
  isSimplified,
  setIsSimplified,
  selectedProvince,
  setSelectedProvince,
}) => {
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

export default MainScreen;
