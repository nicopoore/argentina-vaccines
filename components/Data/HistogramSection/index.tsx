// Dependencies
import React, { useState } from 'react';
import { CircularProgress, Flex } from '@chakra-ui/react';

// Components
import Histogram from './Histogram/index';
import ScaleButton from './ScaleButton';

// Utils
import { DatabaseDateItem } from '../../../utils/types';

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
      <ScaleButton YAxisIsScaled={YAxisIsScaled} handleClick={handleClick} />
    </Flex>
  );
};

export default HistogramSection;
