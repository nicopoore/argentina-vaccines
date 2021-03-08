import { ButtonGroup, Button, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { RawVaccineTypeItem } from '../../../utils/types';

interface Props {
  vaccines: RawVaccineTypeItem[];
  activeType: string;
  handleChange: (_: string) => void;
}

const VaccineTypeButtons: React.FC<Props> = (props): JSX.Element => {
  const buttonSize = useBreakpointValue({
    base: 'xs',
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
    xl: 'sm',
    '2xl': 'md',
  });
  return (
    <ButtonGroup isAttached my={3} size={buttonSize}>
      {props.vaccines.map(vaccineType => (
        <Button
          key={`${vaccineType.name}-button`}
          colorScheme={props.activeType === vaccineType.name ? 'blue' : undefined}
          onClick={() => props.handleChange(vaccineType.name)}
        >
          {vaccineType.shortName}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default VaccineTypeButtons;
