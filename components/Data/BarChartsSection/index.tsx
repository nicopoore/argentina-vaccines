// Dependencies
import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/layout';

// Components
import BarChart from '../BarChart';

// Utils
import { vaccineTypes } from '../../../utils/staticData.json';
import {
  formatVaccineDataItem,
  formatVaccineOrigin,
  getFilteredData,
} from '../../../utils/functions';
import { SelectionContext, DataContext } from '../../../utils/Context';
import { MotionFlex } from '../../../utils/MotionComponents';

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

  const [population, filteredData] = getFilteredData(data, selectedProvince);

  const vaccineData = formatVaccineDataItem(filteredData);
  const vaccineNames = vaccineTypes.map(vaccineType => vaccineType.name);
  const vaccineOrigin = formatVaccineOrigin(filteredData, vaccineNames);

  const allCharts = [
    {
      name: '% de la población vacunada',
      values: [
        { name: 'Ambas dosis', value: vaccineData[1] },
        { name: 'Sólo 1ra dosis', value: vaccineData[0] - vaccineData[1] },
        { name: 'No vacunades', value: population - vaccineData[0] },
      ],
      colors: ['#018F40', '#40F66A', '#F56257'],
    },
    {
      name: 'Parcial vs. totalmente vacunades',
      values: [
        { name: 'Ambas dosis', value: vaccineData[1] },
        { name: 'Sólo 1ra dosis', value: vaccineData[0] - vaccineData[1] },
      ],
      colors: ['#3CF096', '#F07624'],
    },
    {
      name: '% de dosis aplicadas por tipo',
      values: [
        { name: 'Sputnik V', value: vaccineOrigin['Sputnik V COVID19 Instituto Gamaleya'] },
        { name: 'Covishield AstraZeneca', value: vaccineOrigin['COVISHIELD ChAdOx1nCoV COVID 19'] },
        { name: 'Sinopharm', value: vaccineOrigin['Sinopharm Vacuna SARSCOV 2 inactivada'] },
        { name: 'ChAd0x1 AstraZeneca', value: vaccineOrigin['AstraZeneca ChAdOx1 S recombinante'] },
        { name: 'Moderna', value: vaccineOrigin['Moderna mRNA-1273'] },
      ],
      colors: ['#4CBDF5', '#9551F5', '#F5EF33', '#62FCA8'],
    },
  ];

  return (
    <MotionFlex
      layout
      bgColor="gray.900"
      direction="column"
      grow={1}
      minW={{ '2xl': 500 }}
      p={8}
      w={{ base: '97.5%', sm: '100%' }}
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
