import { Flex, Text } from '@chakra-ui/layout';
import { Box, Tooltip } from '@chakra-ui/react';
import React from 'react';

interface Props {
  data: { name: string; value: number }[];
  name?: string;
  colors: string[];
  variant?: string;
  lastItem?: boolean;
}

const BarChart: React.FC<Props> = (props): JSX.Element => {
  const total = props.data.reduce((acc, item) => {
    acc += item.value;
    return acc;
  }, 0);

  const formatNumbers = (value: number): string =>
    value.toLocaleString('es-AR', { maximumFractionDigits: 2 });

  return (
    <Box mb={props.lastItem ? 0 : 8}>
      <Flex h={4} w="100%">
        {props.data.map((chartItem, index) => {
          const percentage = (chartItem.value / total) * 100;
          return (
            <Tooltip
              key={chartItem.name}
              label={`${chartItem.name}: ${formatNumbers(chartItem.value)} (${formatNumbers(
                percentage
              )}%)`}
              placement={props.variant === 'vaccineType' ? 'bottom' : 'top'}
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
      {props.name && (
        <Text fontSize="lg" fontWeight="semibold">
          {props.name}
        </Text>
      )}
    </Box>
  );
};

export default BarChart;
