// Dependencies
import React, { useContext, useState } from 'react';
import { Button, Flex } from '@chakra-ui/react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useSWR from 'swr';

// Utils
import { countryPopulation, provincePopulation } from '../../../utils/staticData.json';
import {
  fetcher,
  formatVaccineData,
  formatVaccineDataItem,
  getCurrentProvince,
  getProvincePopulation,
} from '../../../utils/functions';
import { SelectionContext } from '../../../utils/Context';

const HistogramSection: React.FC = (): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);
  const { data, error } = useSWR('/api/historic_data', fetcher);
  const [YAxisIsScaled, setYAxisIsScaled] = useState(false);
  if (error) return <p>Error fetching historical data</p>;
  if (!data) return <></>;

  const population =
    selectedProvince === 'Argentina'
      ? countryPopulation
      : getProvincePopulation(provincePopulation, selectedProvince);

  const fullCurrentVaccineData = formatVaccineData(data[data.length - 1].data);

  const histogramData = data.map(rawDataItem => {
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

  const handleClick = async (): Promise<void> => {
    setYAxisIsScaled(YAxisIsScaled => !YAxisIsScaled);
  };

  return (
    <>
      <Flex
        bgColor="gray.900"
        grow={1}
        minH={120}
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