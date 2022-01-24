// Dependencies
import React, { useContext } from 'react';
import { Text } from '@chakra-ui/react';

// Components
import { DoseInfo } from 'components';

// Utils
import { SelectionContext } from 'utils/Context';
import { MotionFlex } from 'utils/MotionComponents';

const NumbersSection: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const doses = [1, 2, 3];
  return (
    <MotionFlex
      layout
      bgColor="gray.900"
      direction="column"
      justify="center"
      mb={{ base: 2, '2xl': 0 }}
      minH={300}
      minW={{ base: 0, md: 400 }}
      ml={{ base: 0, md: 2, '2xl': 0 }}
      p={8}
      w={['95%', '97.5%', '100%', null, 'initial']}
    >
      <Text as="h5" fontSize="2xl">
        {selectedProvince}
      </Text>
      {doses.map((dose: 1 | 2 | 3) => (
        <DoseInfo key={`dose-${dose}`} dose={dose} />
      ))}
    </MotionFlex>
  );
};

export default NumbersSection;
