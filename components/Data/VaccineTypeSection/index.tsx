// Dependencies
import React, { useState } from 'react';
import { Text } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';

// Components
import VaccineTypeData from './VaccineTypeData';
import VaccineTypeButtons from './VaccineTypeButtons';

// Utils
import { vaccineTypes as rawVaccineTypes } from '../../../utils/staticData.json';
import { MotionFlex } from '../../../utils/MotionComponents';

const VaccineTypeSection: React.FC = (): JSX.Element => {
  const [activeType, setActiveType] = useState('Sputnik V COVID19 Instituto Gamaleya');

  const handleChange = (vaccineName: string): void => {
    setActiveType(() => vaccineName);
  };

  return (
    <AnimateSharedLayout>
      <MotionFlex
        layout
        animate="visible"
        bgColor="gray.900"
        direction="column"
        exit="hidden"
        initial="hidden"
        mb={{ base: 6, md: 12, '2xl': 0 }}
        minW={[300, 350, 400]}
        overflow="hidden"
        p={8}
        variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        w={{ base: '100%', '2xl': 550 }}
      >
        <Text as="h2" fontSize="2xl">
          Vacunas en la Argentina
        </Text>
        <VaccineTypeButtons
          activeType={activeType}
          handleChange={handleChange}
          vaccines={[...rawVaccineTypes, { name: 'Total', shortName: 'Total' }]}
        />
        <VaccineTypeData activeType={activeType} />
      </MotionFlex>
    </AnimateSharedLayout>
  );
};

export default VaccineTypeSection;
