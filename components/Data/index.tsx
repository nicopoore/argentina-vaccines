import { Flex, Stack } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import React, { useContext } from 'react';
import MotionBox from '../../utils/MotionBox';
import MotionStack from '../../utils/MotionStack';
import { SelectionContext } from '../../utils/SelectionContext';
import BarChartsSection from './BarChartsSection';
import NumbersSection from './NumbersSection';
import VaccineTypeSection from './VaccineTypeSection';

const Data: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  return (
    <Stack alignItems="center" flexGrow={1} justify="center" overflow="hidden">
      <Stack
        alignItems="center"
        direction="row"
        justify="center"
        w={['100%', '60%', '60%', '60%', 'initial']}
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
              <Flex bgColor="gray.900" direction="column" grow={1} minH={200} w="100%" />
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
