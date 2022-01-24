// Dependencies
import React, { useState } from 'react';
import { Box, CircularProgress, Flex, IconButton, Tooltip } from '@chakra-ui/react';

// Components
import { Histogram } from 'components';

// Utils
import { DatabaseDateItem } from 'utils/types';
import { ZoomOutIcon, ZoomInIcon } from 'components/_icons';

interface Props {
  data: DatabaseDateItem[];
  error: boolean;
}

const HistogramSection: React.FC<Props> = (props): JSX.Element => {
  const [YAxisIsScaled, setYAxisIsScaled] = useState(false);

  if (!props.data)
    return (
      <Flex
        alignItems="center"
        bgColor="gray.900"
        direction="column"
        grow={1}
        justify="center"
        minH={200}
      >
        {props.error ? (
          'Error buscando datos históricos'
        ) : (
          <>
            <CircularProgress isIndeterminate />
            Buscando datos históricos
          </>
        )}
      </Flex>
    );

  const handleClick = async (): Promise<void> => {
    setYAxisIsScaled(YAxisIsScaled => !YAxisIsScaled);
  };

  return (
    <Flex
      alignItems="center"
      bgColor="gray.900"
      grow={1}
      minH={180}
      minW={{ '2xl': 500 }}
      p="2rem 1.5rem 0.5rem 0"
      position="relative"
      w={{ base: '97.5%', sm: '100%' }}
    >
      <Histogram YAxisIsScaled={YAxisIsScaled} data={props.data} />
      <Box position="absolute" right={2} top={2}>
        <Tooltip label={YAxisIsScaled ? 'Normalizar eje Y' : 'Ajustar eje Y'} placement="top">
          <IconButton
            aria-label={YAxisIsScaled ? 'Normalizar eje Y' : 'Ajustar eje Y'}
            icon={YAxisIsScaled ? <ZoomOutIcon /> : <ZoomInIcon />}
            size="sm"
            onClick={handleClick}
          />
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default HistogramSection;
