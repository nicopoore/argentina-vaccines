// Dependencies
import React, { useContext } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';

// Components
import CustomTooltip from './Tooltip';

// Utils
import { DatabaseDateItem } from '../../../../utils/types';
import { countryPopulation, provincePopulations } from '../../../../utils/staticData.json';
import { SelectionContext } from '../../../../utils/Context';
import {
  formatVaccineData,
  formatVaccineDataItem,
  getCurrentProvinceData,
  getProvincePopulation,
} from '../../../../utils/functions';

interface Props {
  YAxisIsScaled: boolean;
  data: DatabaseDateItem[];
}

const Histogram: React.FC<Props> = (props): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const population =
    selectedProvince === 'Argentina'
      ? countryPopulation
      : getProvincePopulation(provincePopulations, selectedProvince);

  const fullCurrentVaccineData = formatVaccineData(props.data[props.data.length - 1].data);

  const histogramData = props.data.map(rawDataItem => {
    const filteredData =
      selectedProvince === 'Argentina'
        ? rawDataItem.data
        : getCurrentProvinceData(rawDataItem.data, selectedProvince);

    const [firstDose, secondDose] = formatVaccineDataItem(filteredData);
    const toPercentage = (vaccineData: number): number =>
      parseFloat(((vaccineData / population) * 100).toFixed(2));

    return {
      date: Date.parse(rawDataItem.date) + 10800000,
      firstDose: toPercentage(firstDose),
      secondDose: toPercentage(secondDose),
    };
  });

  const maxQuantity = Math.max(
    ...Object.keys(fullCurrentVaccineData).reduce((acc, item) => {
      acc.push(
        (fullCurrentVaccineData[item][0] / getProvincePopulation(provincePopulations, item)) * 100
      );
      return acc;
    }, [])
  );

  const XAxisTickFormatter = (date: Date): string => {
    return format(date, 'dd/MM');
  };

  const YAxisTickFormatter = (num: number): string => {
    return `${num}%`;
  };

  return (
    <ResponsiveContainer height="100%" width="100%">
      <AreaChart data={histogramData}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
        <Tooltip content={<CustomTooltip />} />
        <XAxis dataKey="date" minTickGap={10} tickFormatter={XAxisTickFormatter} />
        <YAxis
          domain={[
            0,
            props.YAxisIsScaled
              ? (maxValue: number) => Math.ceil(maxValue)
              : Math.ceil(maxQuantity),
          ]}
          tickFormatter={YAxisTickFormatter}
          type="number"
        />
        <Area color="#ffa14f" dataKey="firstDose" fill="#ffa14f" stroke="#ffa14f" />
        <Area color="#00C49F" dataKey="secondDose" fill="#00C49F" stroke="#00C49F" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
