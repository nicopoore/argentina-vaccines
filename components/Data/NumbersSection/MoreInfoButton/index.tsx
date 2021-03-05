import { Box, Button, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import provinceData from '../../../../utils/population.json';
import { SelectionContext } from '../../../../utils/SelectionContext';
import { PopulationDataItem } from '../../../../utils/types';
import TierraDelFuegoModal from './TierraDelFuegoModal';

const MoreInfoButton: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCloseModal = (): void => {
    setModalIsOpen(() => false);
  };

  const handleOpenModal = (): void => {
    setModalIsOpen(() => true);
  };

  const getCurrentProvince = <T extends PopulationDataItem>(data: T[]): T[] =>
    data.filter(province => province.jurisdiccion_nombre === selectedProvince);

  const url =
    selectedProvince === 'Argentina'
      ? 'https://www.argentina.gob.ar/coronavirus/vacuna/preguntas-frecuentes'
      : getCurrentProvince(provinceData.provincePopulation)[0].info_website;

  return (
    <Box>
      <Text fontSize="md" mb={4}>
        Consultá la información oficial de esta jurisdicción
      </Text>
      {selectedProvince === 'Tierra del Fuego' ? (
        <>
          <Button colorScheme="blue" width="32%" onClick={handleOpenModal}>
            Conocé más
          </Button>
          <TierraDelFuegoModal handleClose={handleCloseModal} isOpen={modalIsOpen} />
        </>
      ) : (
        <Button as="a" colorScheme="blue" href={url} width="32%">
          Conocé más
        </Button>
      )}
    </Box>
  );
};

export default MoreInfoButton;
