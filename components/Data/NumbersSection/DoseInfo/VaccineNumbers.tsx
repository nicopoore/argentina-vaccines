import React, { useContext } from 'react';
import { provincePopulation, countryPopulation } from '../../../../utils/population.json';
import { VaccineDataItem } from '../../../../utils/types';
import { SelectionContext } from '../../../../utils/SelectionContext';
import { Box, SkeletonText, Text } from '@chakra-ui/react';
import {
  formatNumbers,
  formatVaccineData,
  getCurrentProvince,
  getProvincePopulation,
} from '../../../../utils/functions';
import { DataContext } from '../../../../utils/DataContext';

interface VaccineNumbersProps {
  vaccine?: string;
  dose?: 1 | 2;
  numberType: 'raw' | 'percentage';
}

const VaccineNumbers: React.FC<VaccineNumbersProps> = (props): JSX.Element => {
  const data = useContext(DataContext);
  const selectedProvince = useContext(SelectionContext);
  if (!data)
    return (
      <Box w="48%">
        <SkeletonText mt={2} noOfLines={2} pr={4} w="100%" />
        <Text color="gray.500" fontSize="md" mt={1}>
          {props.numberType === 'raw' ? 'personas' : 'de la población'}
        </Text>
      </Box>
    );

  let population = 0;
  let vaccines = [0, 0];
  if (selectedProvince === 'Argentina') {
    population = countryPopulation;
    vaccines = formatVaccineData(data);
  } else {
    population = getProvincePopulation(provincePopulation, selectedProvince);
    const filteredData: VaccineDataItem[] = getCurrentProvince(data, selectedProvince);
    vaccines = formatVaccineData(filteredData);
  }

  return (
    <Box w="48%">
      <Text as="h4" fontSize="4xl" mt={0}>
        {props.numberType === 'raw'
          ? formatNumbers(vaccines[props.dose === 1 ? 0 : 1], 'number')
          : formatNumbers(vaccines[props.dose === 1 ? 0 : 1] / population, 'percentage')}
      </Text>
      <Text color="gray.500" fontSize="md" mt={0}>
        {props.numberType === 'raw' ? 'personas' : 'de la población'}
      </Text>
    </Box>
  );
};

export default VaccineNumbers;
