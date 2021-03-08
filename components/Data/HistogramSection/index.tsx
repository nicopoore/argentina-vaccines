import { Button, Flex } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {
  formatVaccineData,
  getCurrentProvince,
  getProvincePopulation,
} from '../../../utils/functions';
import { SelectionContext } from '../../../utils/SelectionContext';
import { DataContext } from '../../../utils/DataContext';
import rawData from './rawData.json';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { countryPopulation, provincePopulation } from '../../../utils/population.json';

const HistogramSection: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);
  const data = useContext(DataContext);
  const [maxYAxis, setMaxYAxis] = useState(false);
  if (!data) return <></>;

  const population =
    selectedProvince === 'Argentina'
      ? countryPopulation
      : getProvincePopulation(provincePopulation, selectedProvince);

  const histogramData = rawData.map(rawDataItem => {
    const filteredData =
      selectedProvince === 'Argentina'
        ? rawDataItem.data
        : getCurrentProvince(rawDataItem.data, selectedProvince);
    const vaccineData = formatVaccineData(filteredData);
    const toPercentage = (vaccineData: number): number =>
      parseFloat(((vaccineData / population) * 100).toFixed(2));

    const firstDose = toPercentage(vaccineData[0]);
    const secondDose = toPercentage(vaccineData[1]);
    return {
      date: rawDataItem.date,
      firstDose: firstDose,
      secondDose: secondDose,
    };
  });

  const handleClick = (): void => {
    setMaxYAxis(maxYAxis => !maxYAxis);
  };

  return (
    <>
      <Flex
        bgColor="gray.900"
        grow={1}
        minH={200}
        p={8}
        w={{ base: '97.5%', sm: '100%', '2xl': 500 }}
      >
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={histogramData}>
            <Tooltip />
            <XAxis dataKey={'date'} />
            <YAxis
              domain={[0, maxYAxis ? (maxValue: number) => Math.ceil(maxValue) : 5]}
              type="number"
            />
            <Area dataKey="secondDose" fill="#82ca9d" type="monotone" />
            <Area dataKey="firstDose" fill="#8884d8" type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      </Flex>
      <Button onClick={handleClick}>Change Y Axis</Button>
    </>
  );
};

export default HistogramSection;
