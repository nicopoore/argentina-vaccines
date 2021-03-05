import { Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { SelectionContext } from '../../../utils/SelectionContext';
import { VaccineDataItem } from '../../../utils/types';
import DoseInfo from './DoseInfo';

interface Props {
  data: VaccineDataItem[] | 'loading';
}

const Numbers: React.FC<Props> = (props): JSX.Element => {
  const doses = [1, 2];

  const selectedProvince = useContext(SelectionContext);
  return (
    <Flex direction="column" h={300} w={300}>
      <Text as="h5" fontSize="2xl">
        {selectedProvince}
      </Text>
      {doses.map((dose: 1 | 2) => (
        <DoseInfo key={`dose-${dose}`} data={props.data} dose={dose} />
      ))}
    </Flex>
  );
};

export default Numbers;
