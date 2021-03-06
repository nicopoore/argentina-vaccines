import { Text } from '@chakra-ui/react';
import { AnimateSharedLayout, motion } from 'framer-motion';
import React, { useState } from 'react';
import { formatVaccineOrigin } from '../../../utils/functions';
import MotionFlex from '../../../utils/MotionFlex';
import { vaccineTypes as rawVaccineTypes } from '../../../utils/population.json';
import { VaccineDataItem, VaccineTypeItem } from '../../../utils/types';
import VaccineTypeData from './VaccineTypeData';
import VaccineTypeButtons from './VaccineTypeButtons';

interface Props {
  data: VaccineDataItem[] | 'loading';
}

const VaccineTypeSection: React.FC<Props> = (props): JSX.Element => {
  const [activeType, setActiveType] = useState('Sputnik V COVID19 Instituto Gamaleya');
  if (props.data === 'loading') return <></>;

  const vaccineNames = rawVaccineTypes.map(vaccineType => vaccineType.name);
  const vaccineOrigin = formatVaccineOrigin(props.data, vaccineNames);

  const vaccineTypes = rawVaccineTypes.map(vaccineType => {
    return { ...vaccineType, administered: vaccineOrigin[vaccineType['name']] };
  });
  const totalNumbers = vaccineTypes.reduce(
    (acc, item) => {
      acc['arrived'] += item['arrived'];
      acc['purchased'] += item['purchased'];
      acc['administered'] += item['administered'];
      return acc;
    },
    { arrived: 0, purchased: 0, administered: 0, name: 'Total', shortName: 'Total' }
  );
  const fullVaccineArray = [...vaccineTypes, totalNumbers];

  type ActiveDataType =
    | VaccineTypeItem
    | {
        arrived: number;
        purchased: number;
        administered: number;
        name: 'Total';
        shortName: 'Total';
      };
  const activeData: ActiveDataType = fullVaccineArray.filter(
    vaccineType => vaccineType.name === activeType
  )[0];

  const handleChange = (vaccineType: VaccineTypeItem): void => {
    setActiveType(() => vaccineType.name);
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
          fullVaccineArray={fullVaccineArray}
          handleChange={handleChange}
        />
        <VaccineTypeData activeData={activeData} />
      </MotionFlex>
    </AnimateSharedLayout>
  );
};

export default motion(VaccineTypeSection);
