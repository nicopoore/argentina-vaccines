// Dependencies
import React from 'react';
import { Select } from '@chakra-ui/react';

// Utils
import { RawVaccineTypeItem } from '../../../utils/types';

interface Props {
  vaccines: RawVaccineTypeItem[];
  activeType: string;
  handleChange: (_: string) => void;
}

const VaccineTypeButtons: React.FC<Props> = (props): JSX.Element => {
  return (
    <Select
      my={3}
      value={props.activeType}
      onChange={e => props.handleChange(e.currentTarget.value)}
    >
      {props.vaccines.map(vaccineType => (
        <option key={`${vaccineType.name}-button`}>{vaccineType.shortName}</option>
      ))}
    </Select>
  );
};

export default VaccineTypeButtons;
