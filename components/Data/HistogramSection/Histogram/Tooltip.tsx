// Dependencies
import React from 'react';
import { Flex, Stack, Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { TooltipProps } from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

const Tooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>): JSX.Element => {
  if (active && payload && payload.length) {
    return (
      <Flex bgColor="gray.700" direction="column" p={4}>
        <Text color="gray.400" mb={2}>
          {format(label, "d 'de' MMMM", { locale: es })}
        </Text>
        <Stack direction="row" spacing={6}>
          {payload.map(payloadItem => (
            <Stack direction="row">
              <Box bgColor={payloadItem.color} h="100%" w={1} />
              <Flex direction="column">
                <Text fontSize="xl" fontWeight="bold">
                  {typeof payloadItem.value === 'number' && payloadItem.value.toFixed(2)} %
                </Text>
                <Text color="gray.400" fontSize="sm">
                  {payload.indexOf(payloadItem) === 0 ? '1ra dosis' : 'Ambas dosis'}
                </Text>
              </Flex>
            </Stack>
          ))}
        </Stack>
      </Flex>
    );
  }
  return null;
};

export default Tooltip;
