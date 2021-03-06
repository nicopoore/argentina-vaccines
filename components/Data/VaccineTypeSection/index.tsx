import { Box, Button, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { formatNumbers, formatVaccineOrigin } from '../../../utils/functions';
import { vaccineTypes } from '../../../utils/population.json';
import { VaccineDataItem, VaccineTypeItem } from '../../../utils/types';
import BarChart from '../BarChartsSection/BarChart';

interface Props {
  data: VaccineDataItem[] | 'loading';
}

const VaccineTypeSection: React.FC<Props> = (props): JSX.Element => {
  const [activeType, setActiveType] = useState('Sputnik V COVID19 Instituto Gamaleya');
  if (props.data === 'loading') return <></>;

  const filteredData = props.data;

  const vaccineNames = vaccineTypes.map(vaccineType => vaccineType.name);
  const vaccineOrigin = formatVaccineOrigin(filteredData, vaccineNames);
  const fullVaccineArray = vaccineTypes.map(vaccineType => {
    return { ...vaccineType, administered: vaccineOrigin[vaccineType['name']] };
  });

  const handleChange = (vaccineType: VaccineTypeItem): void => {
    setActiveType(() => vaccineType.name);
  };

  const activeData = fullVaccineArray.filter(vaccineType => vaccineType.name === activeType)[0];

  const administered = [
    { name: 'Aplicadas', value: activeData.administered },
    { name: 'Entregadas (por aplicar)', value: activeData.arrived - activeData.administered },
    { name: 'Comprometidas (por entregar)', value: activeData.purchased - activeData.arrived },
  ];

  const chart = {
    name: `Vacunas ${activeData.shortName} aplicadas, entregadas y comprometidas`,
    values: administered,
    colors: ['#0088FE', '#22D4DF', '#FF8042'],
  };

  return (
    <Flex bgColor="gray.900" direction="column" minH={300} p={8} w={450}>
      <Text fontSize="2xl">Vacunas en la Argentina</Text>
      <ButtonGroup isAttached my={3}>
        {fullVaccineArray.map(vaccineType => (
          <Button
            colorScheme={activeType === vaccineType.name ? 'blue' : undefined}
            onClick={() => handleChange(vaccineType)}
          >
            {vaccineType.shortName}
          </Button>
        ))}
      </ButtonGroup>
      <Box px="12">
        <Box mb={4}>
          <Text fontSize="xl">{activeData.shortName}</Text>
          <Text color="gray.500" fontSize="md">
            {activeData.provider}
          </Text>
          <Image
            alt={activeData.countryProduced}
            boxSize="24px"
            mt={1}
            src={`https://www.countryflags.io/${activeData.countryProduced}/flat/48.png`}
          />
        </Box>
        <Box>
          <BarChart lastItem colors={chart.colors} data={chart.values} variant="vaccineType" />
          <Text fontSize="4xl" mt={2}>
            {formatNumbers(activeData.purchased, 'number')}
          </Text>
          <Text color="gray.500">vacunas comprometidas</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default VaccineTypeSection;
