import React, { useContext } from 'react';
import { VaccineDataItem } from '../../../utils/types';
import {
  countryPopulation,
  provincePopulation,
  vaccineTypes,
} from '../../../utils/population.json';
import BarChart from '../BarChart';
import {
  formatVaccineDataItem,
  formatVaccineOrigin,
  getCurrentProvince,
  getProvincePopulation,
} from '../../../utils/functions';
import { SelectionContext } from '../../../utils/Context/SelectionContext';
import MotionFlex from '../../../utils/MotionComponents/MotionFlex';
import { Flex } from '@chakra-ui/layout';
import { DataContext } from '../../../utils/Context/DataContext';

const BarChartsSection: React.FC = (): JSX.Element => {
  const chartNames = [
    '% de la población vacunada (1 o más dosis)',
    'Parcial vs. totalmente vacunades',
    '% de vacunades por tipo (1 o más dosis)',
  ];
  const data = useContext(DataContext);
  const selectedProvince = useContext(SelectionContext);
  if (!data)
    return (
      <Flex
        bgColor="gray.900"
        direction="column"
        p={8}
        w={{ base: '97.5%', sm: '100%', '2xl': 500 }}
      >
        {chartNames.map((chartName, index) => (
          <BarChart
            key={`${chartName}-bar-chart`}
            lastItem={index === chartNames.length - 1 ? true : false}
            name={chartName}
          />
        ))}
      </Flex>
    );

  let population = 0;
  let filteredData: VaccineDataItem[];
  if (selectedProvince === 'Argentina') {
    population = countryPopulation;
    filteredData = data;
  } else {
    population = getProvincePopulation(provincePopulation, selectedProvince);
    filteredData = getCurrentProvince(data, selectedProvince);
  }

  const vaccineData = formatVaccineDataItem(filteredData);
  const vaccineNames = vaccineTypes.map(vaccineType => vaccineType.name);
  const vaccineOrigin = formatVaccineOrigin(filteredData, vaccineNames);

  const allCharts = [
    {
      name: '% de la población vacunada (1 o más dosis)',
      values: [
        { name: 'Vacunadas', value: vaccineData[0] },
        { name: 'No vacunadas', value: population - vaccineData[0] },
      ],
      colors: ['#00C49F', '#FF8042'],
    },
    {
      name: 'Parcial vs. totalmente vacunades',
      values: [
        { name: 'Ambas dosis', value: vaccineData[1] },
        { name: 'Sólo 1ra dosis', value: vaccineData[0] - vaccineData[1] },
      ],
      colors: ['#00C49F', '#FFBB28'],
    },
    {
      name: '% de vacunades por tipo (1 o más dosis)',
      values: [
        { name: 'Sputnik V', value: vaccineOrigin['Sputnik V COVID19 Instituto Gamaleya'] },
        { name: 'Covishield', value: vaccineOrigin['COVISHIELD ChAdOx1nCoV COVID 19'] },
        { name: 'Sinopharma', value: vaccineOrigin['Sinopharm Vacuna SARSCOV 2 inactivada'] },
      ],
      colors: ['#0088FE', '#22D4DF', '#FF8042'],
    },
  ];

  return (
    <MotionFlex
      layout
      bgColor="gray.900"
      direction="column"
      grow={1}
      p={8}
      w={{ base: '97.5%', sm: '100%', '2xl': 500 }}
    >
      {allCharts.map((chart, index) => (
        <BarChart
          key={`${chart.name}-bar-chart`}
          colors={chart.colors}
          data={chart.values}
          lastItem={index === allCharts.length - 1 ? true : false}
          name={chart.name}
        />
      ))}
    </MotionFlex>
  );
};

export default BarChartsSection;
