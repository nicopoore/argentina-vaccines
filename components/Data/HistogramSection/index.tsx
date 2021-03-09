import { Button, Flex } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {
  formatVaccineData,
  formatVaccineDataItem,
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
  const [YAxisIsScaled, setYAxisIsScaled] = useState(false);
  if (!data) return <></>;

  const population =
    selectedProvince === 'Argentina'
      ? countryPopulation
      : getProvincePopulation(provincePopulation, selectedProvince);

  const fullCurrentVaccineData = formatVaccineData(data);

  const histogramData = rawData.map(rawDataItem => {
    const filteredData =
      selectedProvince === 'Argentina'
        ? rawDataItem.data
        : getCurrentProvince(rawDataItem.data, selectedProvince);
    const vaccineData = formatVaccineDataItem(filteredData);
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

  const maxQuantity = Math.max(
    ...Object.keys(fullCurrentVaccineData).reduce((acc, item) => {
      acc.push(
        (fullCurrentVaccineData[item][0] / getProvincePopulation(provincePopulation, item)) * 100
      );
      return acc;
    }, [])
  );

  const handleClick = (): void => {
    setYAxisIsScaled(YAxisIsScaled => !YAxisIsScaled);
  };

  return (
    <>
      <Flex
        bgColor="gray.900"
        grow={1}
        minH={200}
        p={8}
        pb={2}
        pl={0}
        w={{ base: '97.5%', sm: '100%', '2xl': 500 }}
      >
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart data={histogramData}>
            <Tooltip />
            <XAxis dataKey={'date'} />
            <YAxis
              domain={[
                0,
                YAxisIsScaled ? (maxValue: number) => Math.ceil(maxValue) : Math.ceil(maxQuantity),
              ]}
              type="number"
            />
            <Area dataKey="secondDose" fill="#82ca9d" type="monotone" />
            <Area dataKey="firstDose" fill="#8884d8" type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      </Flex>
      <Button onClick={handleClick}>
        {YAxisIsScaled ? `Normalizar eje Y (0-${Math.ceil(maxQuantity)}%)` : 'Ajustar eje Y'}
      </Button>
    </>
  );
};

export default HistogramSection;
