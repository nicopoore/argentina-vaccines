import React, { useContext } from 'react';
import { VaccineDataItem } from '../../../utils/types';
import { countryPopulation, provincePopulation } from '../../../utils/population.json';
import { Flex } from '@chakra-ui/react';
import BarChart from './BarChart';
import {
  formatVaccineData,
  formatVaccineOrigin,
  getCurrentProvince,
  getProvincePopulation,
} from '../../../utils/functions';
import { SelectionContext } from '../../../utils/SelectionContext';

interface Props {
  data: VaccineDataItem[] | 'loading';
}

const BarChartsSection: React.FC<Props> = (props): JSX.Element => {
  if (props.data === 'loading') return <></>;

  const selectedProvince = useContext(SelectionContext);

  let population = 0;
  let vaccineData = [0, 0];
  let filteredData;
  if (selectedProvince === 'Argentina') {
    population = countryPopulation;
    filteredData = props.data;
    vaccineData = formatVaccineData(props.data);
  } else {
    population = getProvincePopulation(provincePopulation, selectedProvince);
    filteredData = getCurrentProvince(props.data, selectedProvince);
    vaccineData = formatVaccineData(filteredData);
  }

  const vaccineNames = [
    'Sputnik V COVID19 Instituto Gamaleya',
    'COVISHIELD ChAdOx1nCoV COVID 19',
    'Sinopharm Vacuna SARSCOV 2 inactivada',
  ];
  const vaccineOrigin = formatVaccineOrigin(filteredData, vaccineNames);

  const vaxVsUnvax = [
    { name: 'Vacunadas', value: vaccineData[0] },
    { name: 'No vacunadas', value: population - vaccineData[0] },
  ];
  const firstVsSecond = [
    { name: 'Ambas dosis', value: vaccineData[1] },
    { name: 'Sólo 1ra dosis', value: vaccineData[0] - vaccineData[1] },
  ];
  const vaccineOriginVs = [
    { name: 'Sputnik V', value: vaccineOrigin[0] },
    { name: 'Covishield', value: vaccineOrigin[1] },
    { name: 'Sinopharma', value: vaccineOrigin[2] },
  ];

  const allCharts = [
    {
      name: '% de la población vacunada (1 o más dosis)',
      values: vaxVsUnvax,
      colors: ['#00C49F', '#FF8042'],
    },
    {
      name: 'Parcial vs. totalmente vacunades',
      values: firstVsSecond,
      colors: ['#00C49F', '#FFBB28'],
    },
    {
      name: '% de vacunades por fabricante (1 o más dosis)',
      values: vaccineOriginVs,
      colors: ['#0088FE', '#22D4DF', '#FF8042'],
    },
  ];

  return (
    <Flex direction="column" h={300} px={4} w={500}>
      {allCharts.map(chart => (
        <BarChart colors={chart.colors} data={chart.values} name={chart.name} />
      ))}
    </Flex>
  );
};

export default BarChartsSection;
