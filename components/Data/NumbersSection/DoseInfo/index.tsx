// Dependencies
import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

// Components
import VaccineNumbers from './VaccineNumbers';

interface Props {
  dose: 1 | 2;
}

const DoseInfo: React.FC<Props> = (props): JSX.Element => {
  return (
    <>
      <Text as="h6" fontSize="xl" mt={4}>
        {props.dose === 1 ? 'Primera dosis' : 'Ambas dosis'}
      </Text>
      <Flex justify="space-between">
        <VaccineNumbers dose={props.dose} numberType="raw" />
        <VaccineNumbers dose={props.dose} numberType="percentage" />
      </Flex>
    </>
  );
};

export default DoseInfo;
