// Dependencies
import React, { useContext } from 'react';
import { Stack } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

// Components
import BarChartsSection from './BarChartsSection';
import HistogramSection from './HistogramSection';
import NumbersSection from './NumbersSection';
import VaccineTypeSection from './VaccineTypeSection';

// Utils
import { MotionBox, MotionStack } from '../../utils/MotionComponents';
import { SelectionContext } from '../../utils/Context';

const Data: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  return (
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
            mb={6}
            wrap="wrap"
          >
            <NumbersSection />
            <MotionStack layout>
              <BarChartsSection />
              <HistogramSection />
            </MotionStack>
          </MotionStack>

          <MotionBox layout id="flexLineBreak" w="100%" />
          <AnimatePresence>
            {selectedProvince === 'Argentina' && <VaccineTypeSection />}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Stack>
    </Stack>
  );
};

export default Data;
