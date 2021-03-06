import { Box, Text, Image } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { formatNumbers } from '../../../utils/functions';
import MotionBox from '../../../utils/MotionBox';
import { VaccineTypeItem } from '../../../utils/types';
import BarChart from '../BarChartsSection/BarChart';

interface Props {
  activeData: VaccineTypeItem;
}

const VaccineTypeData: React.FC<Props> = (props): JSX.Element => {
  const chart = {
    name: `Vacunas ${props.activeData.shortName} aplicadas, entregadas y comprometidas`,
    values: [
      { name: 'Aplicadas', value: props.activeData.administered },
      {
        name: 'Entregadas (por aplicar)',
        value: props.activeData.arrived - props.activeData.administered,
      },
      {
        name: 'Comprometidas (por entregar)',
        value: props.activeData.purchased - props.activeData.arrived,
      },
    ],
    colors: ['#0088FE', '#22D4DF', '#FF8042'],
  };
  return (
    <Box key="bottom-section" layout px={6}>
      <Box layout mb={4}>
        <Text fontSize="xl">{props.activeData.shortName}</Text>
        <AnimatePresence>
          {props.activeData.shortName !== 'Total' && (
            <MotionBox
              layout
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <Text color="gray.500" fontSize="md">
                {props.activeData.provider}
              </Text>
              <Image
                alt={props.activeData.countryProduced}
                boxSize="24px"
                mt={1}
                src={`https://www.countryflags.io/${props.activeData.countryProduced}/flat/48.png`}
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
      <MotionBox layout mt={props.activeData.shortName === 'Total' ? 4 : 0}>
        <BarChart lastItem colors={chart.colors} data={chart.values} variant="vaccineType" />
        <Text fontSize="3xl" mt={2}>
          {formatNumbers(props.activeData.purchased, 'number')}
        </Text>
        <Text color="gray.500" fontSize="sm">
          vacunas comprometidas
        </Text>
      </MotionBox>
    </Box>
  );
};

export default VaccineTypeData;
