// Dependencies
import React from 'react';
import { Box, Skeleton, Tooltip } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { AnimateSharedLayout } from 'framer-motion';

// Utils
import { MotionBox } from 'utils/MotionComponents';
import { formatNumbers } from 'utils/functions';

interface LoadedProps {
  data: { name: string; value: number }[];
  name?: string;
  colors: string[];
  variant?: string;
  lastItem?: boolean;
}

interface LoadingProps {
  name?: string;
  lastItem?: boolean;
}

type Props = LoadedProps | LoadingProps;

const BarChart: React.FC<Props> = (props): JSX.Element => {
  let total: number;
  if ('data' in props) {
    total = props.data.reduce((acc, item) => {
      acc += item.value;
      return acc;
    }, 0);
  }

  return (
    <Box mb={props.lastItem ? 0 : 6}>
      <Flex borderRadius={2} h={4} mb={1} overflow="hidden" w="100%">
        {!('data' in props) ? (
          <Skeleton data-testid="barChartSkeleton" h="100%" w="100%" />
        ) : (
          <AnimateSharedLayout>
            {props.data.map((chartItem, index) => {
              const percentage = chartItem.value / total;
              return (
                <Tooltip
                  key={chartItem.name}
                  label={`${chartItem.name}: ${formatNumbers(
                    chartItem.value,
                    'number'
                  )} (${formatNumbers(percentage, 'percentage')})`}
                  placement={props.variant === 'vaccineType' ? 'bottom' : 'top'}
                >
                  <MotionBox
                    key={`${chartItem.name}-box`}
                    layout
                    bgColor={props.colors[index]}
                    data-testid={`barChartItem-${index}`}
                    h="100%"
                    layoutId={chartItem.name}
                    w={`${percentage * 100}%`}
                  />
                </Tooltip>
              );
            })}
          </AnimateSharedLayout>
        )}
      </Flex>
      {props.name ? (
        <Text fontSize="lg" fontWeight="semibold">
          {props.name}
        </Text>
      ) : null}
    </Box>
  );
};

export default BarChart;
