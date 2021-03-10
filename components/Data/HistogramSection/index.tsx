// Dependencies
import React, { useState } from 'react';
import { CircularProgress, Flex } from '@chakra-ui/react';
import useSWR from 'swr';

// Components
import Histogram from './Histogram/index';

// Utils
import { fetcher } from '../../../utils/functions';
import ScaleButton from './ScaleButton';

const HistogramSection: React.FC = (): JSX.Element => {
  const { data, error } = useSWR('/api/historic_data', fetcher);
  const [YAxisIsScaled, setYAxisIsScaled] = useState(true);

  if (!data)
    return (
      <Flex
        alignItems="center"
        bgColor="gray.900"
        direction="column"
        grow={1}
        justify="center"
        minH={200}
      >
        {error ? (
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
      p="2rem 1.5rem 0.5rem 0"
      position="relative"
      w={{ base: '97.5%', sm: '100%', '2xl': 500 }}
    >
      <Histogram YAxisIsScaled={YAxisIsScaled} data={data} />
      <ScaleButton YAxisIsScaled={YAxisIsScaled} handleClick={handleClick} />
    </Flex>
  );
};

export default HistogramSection;
