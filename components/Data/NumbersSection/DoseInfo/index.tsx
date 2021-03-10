// Dependencies
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

// Components
import VaccineNumbers from './VaccineNumbers';

interface DoseInfoProps {
  dose: 1 | 2;
}

const DoseInfo: React.FC<DoseInfoProps> = (props): JSX.Element => {
  return (
    <>
      <Text as="h6" fontSize="xl" mt={4}>
        {props.dose === 1 ? 'Primera dosis' : 'Ambas dosis'}
      </Text>
      <Flex justify="space-between">
        {['raw', 'percentage'].map((numberType: 'raw' | 'percentage') => (
          <VaccineNumbers key={`vaccine-${numberType}`} dose={props.dose} numberType={numberType} />
        ))}
      </Flex>
    </>
  );
};

export default DoseInfo;
