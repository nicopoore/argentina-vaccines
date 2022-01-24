// Dependencies
import React, { useContext } from 'react';
import { Box, Flex, SkeletonText, Text } from '@chakra-ui/react';

// Components
import { DataContext, SelectionContext } from 'utils/Context';
import { formatNumbers, formatVaccineDataItem, getFilteredData } from 'utils/functions';

type DoseType = 1 | 2 | 3;

interface VaccineNumbersProps {
  dose: DoseType;
  numberType: 'raw' | 'percentage';
}

const VaccineNumbers: React.FC<VaccineNumbersProps> = (props): JSX.Element => {
  const data = useContext(DataContext);
  const selectedProvince = useContext(SelectionContext);
  if (!data)
    return (
      <Box w={{ base: '45%', md: '48%' }}>
        <SkeletonText data-testid="vaccineNumbersSkeleton" mt={2} noOfLines={2} pr={4} w="100%" />
        <Text color="gray.500" fontSize="md" mt={1}>
          {props.numberType === 'raw' ? 'personas' : 'de la población'}
        </Text>
      </Box>
    );

  const [population, filteredData] = getFilteredData(data, selectedProvince);
  const { partialVax, fullVax, booster } = formatVaccineDataItem(filteredData);
  const activeDose = props.dose === 1 ? partialVax : props.dose === 2 ? fullVax : booster;

  return (
    <Box w="45%">
      <Text as="h4" fontSize={{ base: '2xl', md: '4xl' }} mt={0} overflowWrap="normal">
        {props.numberType === 'raw'
          ? formatNumbers(activeDose, 'number')
          : formatNumbers(activeDose / population, 'percentage')}
      </Text>
      <Text color="gray.500" fontSize="md" mt={0}>
        {props.numberType === 'raw' ? 'personas' : 'de la población'}
      </Text>
    </Box>
  );
};

interface Props {
  dose: DoseType;
}

const DoseInfo: React.FC<Props> = (props): JSX.Element => {
  return (
    <>
      <Text as="h6" fontSize="xl" mt={4}>
        {props.dose === 1
          ? 'Vacunación parcial'
          : props.dose === 2
          ? 'Vacunación total'
          : 'Refuerzo'}
      </Text>
      <Flex justify="space-between">
        <VaccineNumbers dose={props.dose} numberType="raw" />
        <VaccineNumbers dose={props.dose} numberType="percentage" />
      </Flex>
    </>
  );
};

export default DoseInfo;
