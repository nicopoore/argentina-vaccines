import { Divider, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { SelectionContext } from '../../../utils/SelectionContext';
import { VaccineDataItem } from '../../../utils/types';
import DoseInfo from './DoseInfo';
import MoreInfoButton from './MoreInfoButton/index';

interface Props {
  data: VaccineDataItem[] | 'loading';
}

const NumbersSection: React.FC<Props> = (props): JSX.Element => {
  const doses = [1, 2];

  const selectedProvince = useContext(SelectionContext);
  return (
    <Flex direction="column" minH={300} minW={350}>
      <Text as="h5" fontSize="2xl">
        {selectedProvince}
      </Text>
      {doses.map((dose: 1 | 2) => (
        <DoseInfo key={`dose-${dose}`} data={props.data} dose={dose} />
      ))}
      <Divider mx="auto" my={4} w="20%" />
      <MoreInfoButton />
    </Flex>
  );
};

export default NumbersSection;
