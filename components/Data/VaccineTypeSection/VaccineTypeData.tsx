import { Box, Text, Image, SkeletonText, Skeleton } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, { useContext } from 'react';
import { formatNumbers, formatVaccineOrigin } from '../../../utils/functions';
import MotionBox from '../../../utils/MotionBox';
import { FullVaccineTypeItem } from '../../../utils/types';
import BarChart from '../BarChartsSection/BarChart';
import { vaccineTypes as rawVaccineTypes } from '../../../utils/population.json';
import { DataContext } from '../../../utils/DataContext';

interface Props {
  activeType: string;
}

const VaccineTypeData: React.FC<Props> = (props): JSX.Element => {
  const data = useContext(DataContext);

  if (!data)
    return (
      <Box key="bottom-section" layout px={6}>
        <Box layout mb={4} mt={4}>
          <SkeletonText noOfLines={2} w={32} />
          <Skeleton h="20px" mt={2} w="24px" />
        </Box>
        <MotionBox layout>
          <BarChart lastItem />
          <SkeletonText mt={4} noOfLines={2} w={48} />
        </MotionBox>
      </Box>
    );

  const vaccineNames = rawVaccineTypes.map(vaccineType => vaccineType.name);
  const vaccineOrigin = formatVaccineOrigin(data, vaccineNames);

  const vaccineTypes = rawVaccineTypes.map(vaccineType => {
    return { ...vaccineType, administered: vaccineOrigin[vaccineType['name']] };
  });
  const totalNumbers = vaccineTypes.reduce(
    (acc, item) => {
      acc['arrived'] += item['arrived'];
      acc['purchased'] += item['purchased'];
      acc['administered'] += item['administered'];
      return acc;
    },
    { arrived: 0, purchased: 0, administered: 0, name: 'Total', shortName: 'Total' }
  );
  const fullVaccineArray = [...vaccineTypes, totalNumbers];

  type ActiveDataType = FullVaccineTypeItem;
  const activeData: ActiveDataType = fullVaccineArray.filter(
    vaccineType => vaccineType.name === props.activeType
  )[0];

  const chart = {
    name: `Vacunas ${activeData.shortName} aplicadas, entregadas y comprometidas`,
    values: [
      { name: 'Aplicadas', value: activeData.administered },
      {
        name: 'Entregadas (por aplicar)',
        value: activeData.arrived - activeData.administered,
      },
      {
        name: 'Comprometidas (por entregar)',
        value: activeData.purchased - activeData.arrived,
      },
    ],
    colors: ['#0088FE', '#22D4DF', '#FF8042'],
  };

  return (
    <Box key="bottom-section" layout px={6}>
      <Box layout mb={4}>
        <Text fontSize="xl">{activeData.shortName}</Text>
        <AnimatePresence>
          {activeData.shortName !== 'Total' && (
            <MotionBox
              layout
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            >
              <Text color="gray.500" fontSize="md">
                {activeData.provider}
              </Text>
              <Image
                alt={activeData.countryProduced}
                boxSize="24px"
                mt={1}
                src={`https://www.countryflags.io/${activeData.countryProduced}/flat/48.png`}
              />
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
      <MotionBox layout mt={activeData.shortName === 'Total' ? 4 : 0}>
        <BarChart lastItem colors={chart.colors} data={chart.values} variant="vaccineType" />
        <Text fontSize="3xl" mt={2}>
          {formatNumbers(activeData.purchased, 'number')}
        </Text>
        <Text color="gray.500" fontSize="sm">
          vacunas comprometidas
        </Text>
      </MotionBox>
    </Box>
  );
};

export default VaccineTypeData;
