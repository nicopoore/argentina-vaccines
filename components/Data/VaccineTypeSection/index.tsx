import { Text } from '@chakra-ui/react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import React, { useState } from 'react';
import MotionFlex from '../../../utils/MotionFlex';
import { vaccineTypes as rawVaccineTypes } from '../../../utils/population.json';
import VaccineTypeData from './VaccineTypeData';
import VaccineTypeButtons from './VaccineTypeButtons';

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
        overflow="hidden"
        p={8}
        variants={{ hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        w={550}
      >
        <Text fontSize="2xl">Vacunas en la Argentina</Text>
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

export default motion(VaccineTypeSection);
