// Dependencies
import React, { useContext } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Utils
import { DatabaseDateItem } from '../../../utils/types';
import { countryPopulation, provincePopulation } from '../../../utils/staticData.json';
import { SelectionContext } from '../../../utils/Context';
import {
  formatVaccineData,
  formatVaccineDataItem,
  getCurrentProvince,
  getProvincePopulation,
} from '../../../utils/functions';

interface Props {
  YAxisIsScaled: boolean;
  data: DatabaseDateItem[];
}

const Histogram: React.FC<Props> = (props): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const population =
    selectedProvince === 'Argentina'
      ? countryPopulation
      : getProvincePopulation(provincePopulation, selectedProvince);

  const fullCurrentVaccineData = formatVaccineData(props.data[props.data.length - 1].data);

  const histogramData = props.data.map(rawDataItem => {
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

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={histogramData}>
        <Tooltip />
        <XAxis dataKey={'date'} />
        <YAxis
          domain={[
            0,
            props.YAxisIsScaled
              ? (maxValue: number) => Math.ceil(maxValue)
              : Math.ceil(maxQuantity),
          ]}
          type="number"
        />
        <Area dataKey="secondDose" fill="#82ca9d" type="monotone" />
        <Area dataKey="firstDose" fill="#8884d8" type="monotone" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
