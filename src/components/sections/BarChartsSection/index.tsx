// Dependencies
import React, { useContext } from 'react';
import { Flex } from '@chakra-ui/layout';

// Components
import { BarChart } from 'components';

// Utils
import { vaccineTypes } from 'utils/staticData.json';
import { formatVaccineDataItem, formatVaccineOrigin, getFilteredData } from 'utils/functions';
import { SelectionContext, DataContext } from 'utils/Context';
import { MotionFlex } from 'utils/MotionComponents';

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
        { name: 'Refuerzo', value: vaccineData.booster },
        { name: 'Vacunación total', value: vaccineData.fullVax - vaccineData.booster },
        {
          name: 'Sólo vacunación parcial',
          value: vaccineData.partialVax - vaccineData.fullVax,
        },
        { name: 'No vacunades', value: population - vaccineData.partialVax },
      ],
      colors: ['#4CBDF5', '#018F40', '#40F66A', '#F56257'],
    },
    {
      name: '% de dosis aplicadas por tipo',
      values: [
        { name: 'Primera dosis', value: vaccineData.firstDose },
        { name: 'Segunda dosis', value: vaccineData.secondDose },
        { name: 'Unica dosis', value: vaccineData.onlyDose },
        { name: 'Refuerzo', value: vaccineData.booster },
        { name: 'Adicional', value: vaccineData.additional },
      ],
      colors: ['#4CBDF5', '#9551F5', '#F5EF33', '#62FCA8', '#4CBDF5'],
    },
    {
      name: '% de dosis aplicadas por vacuna',
      values: [
        { name: 'Sputnik V', value: vaccineOrigin['Sputnik V COVID19 Instituto Gamaleya'] },
        { name: 'Covishield AstraZeneca', value: vaccineOrigin['COVISHIELD ChAdOx1nCoV COVID 19'] },
        { name: 'Sinopharm', value: vaccineOrigin['Sinopharm Vacuna SARSCOV 2 inactivada'] },
        { name: 'ChAd0x1 AstraZeneca', value: vaccineOrigin['AstraZeneca ChAdOx1 S recombinante'] },
        { name: 'Moderna', value: vaccineOrigin['Moderna ARNm'] },
        { name: 'Pfizer', value: vaccineOrigin['Pfizer BioNTech Comirnaty'] },
        { name: 'Convidecia', value: vaccineOrigin['Cansino Ad5 nCoV'] },
      ],
      colors: ['#4CBDF5', '#9551F5', '#F5EF33', '#62FCA8', '#4CBDF5', '#9551F5', '#F5EF33'],
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
