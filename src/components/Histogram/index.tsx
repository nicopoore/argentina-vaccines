// Dependencies
import React, { useContext } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Utils
import { DatabaseDateItem } from 'utils/types';
import { provincePopulations } from 'utils/staticData.json';
import { SelectionContext } from 'utils/Context';
import { getProvincePopulation } from 'utils/functions';
import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>): JSX.Element => {
  if (active && payload && payload.length) {
    return (
      <Flex bgColor="gray.700" direction="column" p={4}>
        <Text color="gray.400" mb={2}>
          {format(label, "d 'de' MMMM", { locale: es })}
        </Text>
        <Stack direction="row" spacing={6}>
          {payload.map(payloadItem => {
            if (payloadItem.value === 0) return null;
            return (
              <Stack key={payloadItem.name} direction="row">
                <Box bgColor={payloadItem.color} h="100%" w={1} />
                <Flex direction="column">
                  <Text fontSize="xl" fontWeight="bold">
                    {typeof payloadItem.value === 'number' && payloadItem.value.toFixed(2)} %
                  </Text>
                  <Text color="gray.400" fontSize="sm">
                    {payload.indexOf(payloadItem) === 0
                      ? 'Parcial'
                      : payload.indexOf(payloadItem) === 1
                      ? 'Total'
                      : 'Refuerzo'}
                  </Text>
                </Flex>
              </Stack>
            );
          })}
        </Stack>
      </Flex>
    );
  }
  return null;
};

interface Props {
  YAxisIsScaled: boolean;
  data: DatabaseDateItem[];
}

const Histogram: React.FC<Props> = (props): JSX.Element => {
  const selectedProvince = useContext(SelectionContext);

  const histogramData = props.data.map(rawDataItem => {
    const toPercentage = (vaccineData: number): number => {
      return parseFloat(
        (
          (vaccineData / getProvincePopulation(provincePopulations, selectedProvince)) *
          100
        ).toFixed(2)
      );
    };

    return {
      date: Date.parse(rawDataItem.date) + 10800000,
      firstDose: toPercentage(rawDataItem.data.partialVax),
      secondDose: toPercentage(rawDataItem.data.fullVax),
      thirdDose: toPercentage(rawDataItem.data.booster),
    };
  });

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
        <CustomTooltip content={<CustomTooltip />} />
        <XAxis dataKey="date" minTickGap={10} tickFormatter={XAxisTickFormatter} />
        <YAxis
          domain={[0, props.YAxisIsScaled ? (maxValue: number) => Math.ceil(maxValue) : 100]}
          tickFormatter={YAxisTickFormatter}
          type="number"
        />
        <Area color="#ffa14f" dataKey="firstDose" fill="#ffa14f" stroke="#ffa14f" />
        <Area color="#00C49F" dataKey="secondDose" fill="#00C49F" stroke="#00C49F" />
        <Area color="#0C6DA5" dataKey="thirdDose" fill="#0C6DA5" stroke="#0C6DA5" />
        <ReferenceLine stroke="green" strokeDasharray="3 3" y={90} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Histogram;
