import { Typography } from '@material-ui/core';
import React, { useContext } from 'react';
import { provincePopulation, countryPopulation } from '../../rawData/population.json';
import { SelectionContext } from '../SelectionContext';
import { VaccineDataItem, PopulationDataItem } from '../types';
import { Skeleton } from '@material-ui/lab';

interface VaccineNumbersProps {
  place: 'province' | 'country';
  vaccine?: string;
  dose?: 1 | 2;
  numberType: 'raw' | 'percentage';
  data: VaccineDataItem[] | 'loading';
  // eslint-disable-next-line no-unused-vars
  formatVaccineData: (data: VaccineDataItem[]) => [number, number];
}

const VaccineNumbers: React.FC<VaccineNumbersProps> = (props): JSX.Element => {
  if (props.data === 'loading')
    return (
      <>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </>
    );
  const selectedProvince = useContext(SelectionContext);

  const formatNumbers = (num: number, type: string): string => {
    return type === 'percentage'
      ? num.toLocaleString('es-AR', {
          style: 'percent',
          minimumFractionDigits: 2,
        })
      : num.toLocaleString('es-AR');
  };

  const getCurrentProvince = <T extends VaccineDataItem | PopulationDataItem>(data: T[]): T[] => {
    return data.filter(province => province.jurisdiccion_nombre === selectedProvince);
  };

  const getProvincePopulation = (): number => {
    const result = getCurrentProvince(provincePopulation);
    if (!result[0]) return 0;
    return result[0].poblacion_estimada_2021;
  };

  let population = 0;
  let vaccines = [0, 0];
  if (props.place === 'province') {
    population = getProvincePopulation();
    const filteredData = getCurrentProvince(props.data);
    vaccines = props.formatVaccineData(filteredData);
  } else if (props.place === 'country') {
    population = countryPopulation;
    vaccines = props.formatVaccineData(props.data);
  }

  return (
    <>
      <Typography variant="h4">
        {props.numberType === 'raw'
          ? formatNumbers(vaccines[props.dose === 1 ? 0 : 1], 'number')
          : formatNumbers(vaccines[props.dose === 1 ? 0 : 1] / population, 'percentage')}
      </Typography>
      <Typography color="textSecondary" variant="subtitle2">
        {props.numberType === 'raw' ? 'personas' : 'de la población'}
      </Typography>
    </>
  );
};

export default VaccineNumbers;
