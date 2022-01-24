// Dependencies
import React, { useContext, useState } from 'react';
import { Box, Flex, Select, Skeleton, SkeletonText, Text, Image } from '@chakra-ui/react';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

// Components
import { BarChart } from 'components';

// Utils
import { vaccineTypes as rawVaccineTypes } from 'utils/staticData.json';
import { MotionBox, MotionFlex } from 'utils/MotionComponents';
import { DataContext } from 'utils/Context';
import { formatNumbers, formatVaccineOrigin } from 'utils/functions';
import { FullVaccineTypeItem } from 'utils/types';

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

const VaccineTypeSection: React.FC = (): JSX.Element => {
  const [activeType, setActiveType] = useState('Sputnik V');

  const handleChange = (vaccineName: string): void => {
    setActiveType(vaccineName);
  };

  return (
    <AnimateSharedLayout>
      <MotionFlex
        layout
        animate="visible"
        bgColor="gray.900"
        direction="column"
        exit="hidden"
        initial="hidden"
        mb={{ base: 6, md: 12, '2xl': 0 }}
        minW={[300, 350, 400]}
        overflow="hidden"
        p={8}
        variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        w={{ base: '100%', '2xl': 600 }}
      >
        <Text as="h2" fontSize="2xl">
          Vacunas en la Argentina
        </Text>
        <Select my={3} value={activeType} onChange={e => handleChange(e.currentTarget.value)}>
          {[...rawVaccineTypes, { name: 'Total', shortName: 'Total' }].map(vaccineType => (
            <option key={`${vaccineType.name}-button`}>{vaccineType.shortName}</option>
          ))}
        </Select>
        <VaccineTypeData activeType={activeType} />
      </MotionFlex>
    </AnimateSharedLayout>
  );
};

export default VaccineTypeSection;
