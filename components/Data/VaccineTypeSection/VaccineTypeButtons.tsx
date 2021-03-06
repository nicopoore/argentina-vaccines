import { ButtonGroup, Button } from '@chakra-ui/react';
import React from 'react';
import { VaccineTypeItem } from '../../../utils/types';

interface Props {
  fullVaccineArray;
  activeType: string;
  handleChange: (_: VaccineTypeItem) => void;
}

const VaccineTypeButtons: React.FC<Props> = (props): JSX.Element => {
  return (
    <ButtonGroup isAttached my={3}>
      {props.fullVaccineArray.map(vaccineType => (
        <Button
          colorScheme={props.activeType === vaccineType.name ? 'blue' : undefined}
          onClick={() => props.handleChange(vaccineType)}
        >
          {vaccineType.shortName}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default VaccineTypeButtons;
