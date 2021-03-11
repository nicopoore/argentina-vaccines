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

interface Props {
  isSimplified: boolean;
}

const Data: React.FC<Props> = (props): JSX.Element => {
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
            mb={4}
            wrap="wrap"
          >
            <NumbersSection />
            <AnimatePresence>
              {!props.isSimplified && (
                <MotionStack
                  layout
                  animate="visible"
                  exit="hidden"
                  initial="hidden"
                  variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                >
                  <BarChartsSection />
                  <HistogramSection />
                </MotionStack>
              )}
            </AnimatePresence>
          </MotionStack>

          <MotionBox layout id="flexLineBreak" w="100%" />
          <AnimatePresence>
            {selectedProvince === 'Argentina' && !props.isSimplified && <VaccineTypeSection />}
          </AnimatePresence>
        </AnimateSharedLayout>
      </Stack>
    </Stack>
  );
};

export default Data;
