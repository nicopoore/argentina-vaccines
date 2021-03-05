import React, { useContext } from 'react';
import { provincePopulation, countryPopulation } from '../../../../utils/population.json';
import { VaccineDataItem, PopulationDataItem } from '../../../../utils/types';
import { SelectionContext } from '../../../../utils/SelectionContext';
import { Box, SkeletonText, Text } from '@chakra-ui/react';

interface VaccineNumbersProps {
  vaccine?: string;
  dose?: 1 | 2;
  numberType: 'raw' | 'percentage';
  data: VaccineDataItem[] | 'loading';
}

const VaccineNumbers: React.FC<VaccineNumbersProps> = (props): JSX.Element => {
  if (props.data === 'loading')
    return (
      <Box w="48%">
        <SkeletonText mt={2} noOfLines={2} pr={4} w="100%" />
        <Text color="gray.500" fontSize="md" mt={1}>
          {props.numberType === 'raw' ? 'personas' : 'de la población'}
        </Text>
      </Box>
    );
  const selectedProvince = useContext(SelectionContext);

  const formatNumbers = (num: number, type: string): string => {
    return type === 'percentage'
      ? num.toLocaleString('es-AR', {
          style: 'percent',
          minimumFractionDigits: 2,
        })
      : num.toLocaleString('es-AR');
  };

  const getCurrentProvince = <T extends VaccineDataItem | PopulationDataItem>(data: T[]): T[] => {
    return data.filter(province => province.jurisdiccion_nombre === selectedProvince);
  };

  const getProvincePopulation = (): number => {
    const result = getCurrentProvince(provincePopulation);
    if (!result[0]) return 0;
    return result[0].poblacion_estimada_2021;
  };

  const formatVaccineData = (data: VaccineDataItem[]): [number, number] => {
    return data.reduce(
      (acc: [number, number], province: VaccineDataItem) => {
        if (province.jurisdiccion_codigo_indec === null) return acc;
        acc[0] += province.primera_dosis_cantidad;
        acc[1] += province.segunda_dosis_cantidad;
        return acc;
      },
      [0, 0]
    );
  };

  let population = 0;
  let vaccines = [0, 0];
  if (selectedProvince === 'Argentina') {
    population = countryPopulation;
    vaccines = formatVaccineData(props.data);
  } else {
    population = getProvincePopulation();
    const filteredData = getCurrentProvince(props.data);
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
