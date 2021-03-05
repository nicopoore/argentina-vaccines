import { Flex, Text } from '@chakra-ui/layout';
import { Box, Tooltip } from '@chakra-ui/react';
import React from 'react';

interface Props {
  data: { name: string; value: number }[];
  name: string;
  colors: string[];
}

const BarChart: React.FC<Props> = (props): JSX.Element => {
  const total = props.data.reduce((acc, item) => {
    acc += item.value;
    return acc;
  }, 0);

  const formatNumbers = (value: number): string =>
    value.toLocaleString('es-AR', { maximumFractionDigits: 2 });

  return (
    <>
      <Text fontSize="xl" mb={1}>
        {props.name}
      </Text>
      <Flex h={4} mb={4} w="100%">
        {props.data.map((chartItem, index) => {
          const percentage = (chartItem.value / total) * 100;
          return (
            <Tooltip
              label={`${chartItem.name}: ${formatNumbers(chartItem.value)} (${formatNumbers(
                percentage
              )}%)`}
            >
              <Box
                bgColor={props.colors[index]}
                borderLeftRadius={index === 0 ? 2 : 0}
                borderRightRadius={index === props.data.length - 1 ? 2 : 0}
                h="100%"
                w={`${percentage}%`}
              />
            </Tooltip>
          );
        })}
      </Flex>
    </>
  );
};

export default BarChart;
