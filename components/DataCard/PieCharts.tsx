import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { VaccineDataItem } from '../../utils/types';
import { countryPopulation } from '../../utils/population.json';
import { Box, Grid } from '@material-ui/core';

interface PieChartsProps {
  data: VaccineDataItem[] | 'loading';
  // eslint-disable-next-line no-unused-vars
  formatVaccineData: (data: VaccineDataItem[]) => [number, number];
}

const PieCharts: React.FC<PieChartsProps> = (props): JSX.Element => {
  if (props.data === 'loading') return <></>;

  const formatVaccineOrigin = (data: VaccineDataItem[], vaccineNameArray: string[]): number[] => {
    let vaccineArray = [];
    vaccineNameArray.map(vaccineName => {
      vaccineArray.push(
        data
          .filter(row => row.vacuna_nombre === vaccineName)
          .reduce((acc: number, province: VaccineDataItem) => {
            if (province['jurisdiccion_codigo_indec'] === null) return acc;
            acc += province['primera_dosis_cantidad'];
            return acc;
          }, 0)
      );
    });
    return vaccineArray;
  };

  const vaccineData = props.formatVaccineData(props.data);
  const vaccineNames = [
    'Sputnik V COVID19 Instituto Gamaleya',
    'COVISHIELD ChAdOx1nCoV COVID 19',
    'Sinopharm Vacuna SARSCOV 2 inactivada',
  ];
  const vaccineOrigin = formatVaccineOrigin(props.data, vaccineNames);

  const vaxVsUnvax = [
    { name: 'Vacunadas (1 o más dosis)', value: vaccineData[0] },
    { name: 'No vacunadas', value: countryPopulation - vaccineData[1] },
  ];
  const firstVsSecond = [
    { name: 'Ambas dosis', value: vaccineData[1] },
    { name: 'Sólo 1ra dosis', value: vaccineData[0] - vaccineData[1] },
  ];
  const vaccineOriginVs = [
    { name: 'Sputnik V (1 o más dosis)', value: vaccineOrigin[0] },
    { name: 'Oxford-AstraZeneca (1 o más dosis)', value: vaccineOrigin[1] },
    { name: 'Sinopharma (1 o más dosis)', value: vaccineOrigin[2] },
  ];

  const allCharts = [vaxVsUnvax, firstVsSecond, vaccineOriginVs];
  const COLORS = [
    ['#00C49F', '#FF8042'],
    ['#00C49F', '#FFBB28'],
    ['#0088FE', '#22D4DF', '#FF8042'],
  ];

  const formatNumbers = (value: number): string => {
    return value.toLocaleString('es-AR');
  };

  return (
    <Box mt={4}>
      <Grid container direction="row" justify="space-evenly">
        {allCharts.map((chart, chartIndex) => (
          <Grid key={`chart-${chartIndex}`} item>
            <PieChart height={110} width={110}>
              <Pie data={chart} dataKey="value" innerRadius={37} outerRadius={50}>
                {chart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[chartIndex][index]} />
                ))}
              </Pie>
              <Tooltip formatter={formatNumbers} wrapperStyle={{ zIndex: 1 }} />
            </PieChart>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PieCharts;
