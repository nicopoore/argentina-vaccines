// Dependencies
import React, { useContext } from 'react';
import { Box, SkeletonText, Text } from '@chakra-ui/react';

// Utils
import { formatNumbers, formatVaccineDataItem, getFilteredData } from '../../../../utils/functions';
import { SelectionContext, DataContext } from '../../../../utils/Context';

interface Props {
  dose: 1 | 2 | 3;
  numberType: 'raw' | 'percentage';
}

const VaccineNumbers: React.FC<Props> = (props): JSX.Element => {
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

export default VaccineNumbers;
