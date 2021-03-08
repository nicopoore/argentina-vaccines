import { Divider, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import MotionFlex from '../../../utils/MotionFlex';
import { SelectionContext } from '../../../utils/SelectionContext';
import DoseInfo from './DoseInfo';
import MoreInfoButton from './MoreInfoButton/index';

const NumbersSection: React.FC = (): JSX.Element => {
  const doses = [1, 2];

  const selectedProvince = useContext(SelectionContext);
  return (
    <MotionFlex
      layout
      bgColor="gray.900"
      direction="column"
      justify="center"
      mb={[2, 2, 2, 2, 0]}
      minH={300}
      minW={[0, 0, 400, 400, 400]}
      ml={[0, 0, 2, 2, 0]}
      p={8}
      w={['95%', '97.5%', '100%', '100%', 'initial']}
    >
      <Text as="h5" fontSize="2xl">
        {selectedProvince}
      </Text>
      {doses.map((dose: 1 | 2) => (
        <DoseInfo key={`dose-${dose}`} dose={dose} />
      ))}
      <Divider mx="auto" my={4} w="40%" />
      <MoreInfoButton />
    </MotionFlex>
  );
};

export default NumbersSection;
