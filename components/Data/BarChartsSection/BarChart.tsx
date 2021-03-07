import { Flex, Text } from '@chakra-ui/layout';
import { Box, Skeleton, Tooltip } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';
import React from 'react';
import MotionBox from '../../../utils/MotionBox';

interface LoadedProps {
  data: { name: string; value: number }[] | 'loading';
  name?: string;
  colors: string[];
  variant?: string;
  lastItem?: boolean;
}

interface LoadingProps {
  data: 'loading';
  name?: string;
  lastItem?: boolean;
}

const BarChart: React.FC<LoadedProps | LoadingProps> = (props): JSX.Element => {
  let total: number;
  if (props.data !== 'loading') {
    total = props.data.reduce((acc, item) => {
      acc += item.value;
      return acc;
    }, 0);
  }

  const formatNumbers = (value: number): string =>
    value.toLocaleString('es-AR', { maximumFractionDigits: 2 });

  return (
    <Box mb={props.lastItem ? 0 : 8}>
      <Flex borderRadius={2} h={4} mb={1} overflow="hidden" w="100%">
        {props.data === 'loading' ? (
          <Skeleton h="100%" w="100%" />
        ) : (
          <AnimateSharedLayout>
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
                  <MotionBox
                    layout
                    bgColor={props.colors[index]}
                    h="100%"
                    layoutId={chartItem.name}
                    w={`${percentage}%`}
                  />
                </Tooltip>
              );
            })}
          </AnimateSharedLayout>
        )}
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
