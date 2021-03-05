import React from 'react';
import VaccineNumbers from './VaccineNumbers';
import { VaccineDataItem } from '../../../../utils/types';
import { Flex, Text } from '@chakra-ui/react';

interface DoseInfoProps {
  dose: 1 | 2;
  data: VaccineDataItem[] | 'loading';
}

const DoseInfo: React.FC<DoseInfoProps> = (props): JSX.Element => {
  return (
    <>
      <Text as="h6" fontSize="xl" mt={4}>
        {props.dose === 1 ? 'Primera dosis' : 'Ambas dosis'}
      </Text>
      <Flex justify="space-between">
        {['raw', 'percentage'].map((numberType: 'raw' | 'percentage') => (
          <VaccineNumbers
            key={`vaccine-${numberType}`}
            data={props.data}
            dose={props.dose}
            numberType={numberType}
          />
        ))}
      </Flex>
    </>
  );
};

export default DoseInfo;
