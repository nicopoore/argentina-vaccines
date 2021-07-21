// Dependencies
import React, { useContext } from 'react';
import { Box, Text, Image, SkeletonText, Skeleton, Flex } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

// Components
import BarChart from '../BarChart';

// Utils
import { FullVaccineTypeItem } from '../../../utils/types';
import { vaccineTypes as rawVaccineTypes } from '../../../utils/staticData.json';
import { formatNumbers, formatVaccineOrigin } from '../../../utils/functions';
import { DataContext } from '../../../utils/Context';
import { MotionBox } from '../../../utils/MotionComponents';

interface Props {
  activeType: string;
}

const VaccineTypeData: React.FC<Props> = (props): JSX.Element => {
  const data = useContext(DataContext);

  if (!data)
    return (
      <Box key="bottom-section" px={6}>
        <Box mb={4} mt={4}>
          <SkeletonText data-testid="VaccineTypeDataSkeleton-a" noOfLines={2} w={32} />
          <Skeleton data-testid="VaccineTypeDataSkeleton-b" h="20px" mt={2} w="24px" />
        </Box>
        <MotionBox layout>
          <BarChart lastItem />
          <SkeletonText data-testid="VaccineTypeDataSkeleton-c" mt={4} noOfLines={2} w={48} />
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

  const activeData: FullVaccineTypeItem = fullVaccineArray.filter(
    vaccineType => vaccineType.shortName === props.activeType
  )[0];

  const actualPurchased =
    activeData.administered > activeData.arrived
      ? activeData.purchased - activeData.administered
      : activeData.purchased - activeData.arrived;

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
        value: actualPurchased,
      },
    ],
    colors: ['#0088FE', '#22D4DF', '#FF8042'],
  };

  return (
    <Box key="bottom-section" px={6}>
      <Box mb={4}>
        <Text as="h5" fontSize="xl">
          {activeData.shortName}
        </Text>
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
              <Flex>
                {activeData.countryProduced[0] ? (
                  <Image
                    alt={activeData.countryProduced[0]}
                    fallbackSrc={`https://www.countryflags.io/${activeData.countryProduced[0]}/flat/48.png`}
                    mt={1}
                    src={`https://flagcdn.com/20x15/${activeData.countryProduced[0].toLowerCase()}.png`}
                  />
                ) : null}
                {activeData.countryProduced[1] ? (
                  <Image
                    alt={activeData.countryProduced[1]}
                    fallbackSrc={`https://www.countryflags.io/${activeData.countryProduced[1]}/flat/48.png`}
                    ml={1}
                    mt={1}
                    src={`https://flagcdn.com/20x15/${activeData.countryProduced[1].toLowerCase()}.png`}
                  />
                ) : null}
              </Flex>
            </MotionBox>
          )}
        </AnimatePresence>
      </Box>
      <MotionBox layout mt={activeData.shortName === 'Total' ? 4 : 0}>
        <BarChart lastItem colors={chart.colors} data={chart.values} variant="vaccineType" />
        <Text as="h4" fontSize="3xl" mt={2}>
          {formatNumbers(activeData.purchased, 'number')}
        </Text>
        <Text color="gray.500" fontSize="sm">
          dosis comprometidas
        </Text>
      </MotionBox>
    </Box>
  );
};

export default VaccineTypeData;
