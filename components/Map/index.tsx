import { Box } from '@chakra-ui/react';
import React, { memo } from 'react';
import { ComposableMap } from 'react-simple-maps';
import GeographyItem from './GeographyItem';

interface Props {
  setSelectedProvince: (_: string) => void;
}

const Map: React.FC<Props> = ({ setSelectedProvince }): JSX.Element => {
  return (
    <Box
      align="center"
      maxW={['70%', 300, null, 320, 400]}
      mb={{ base: 4, sm: 0 }}
      minW={['70%', 300, null, 320, 400]}
      mx="auto"
      pb={2}
      position="relative"
    >
      <ComposableMap
        height={1730}
        projection="geoMercator"
        projectionConfig={{ scale: 2200, center: [-64, -40] }}
      >
        <GeographyItem setSelectedProvince={setSelectedProvince} />
      </ComposableMap>
      <Box
        position="absolute"
        right={[0, 0, 2, 2, 5]}
        top={['25%', null, 180, 195, 250]}
        w={{ base: '15%', md: '50px', '2xl': '60px' }}
      >
        <ComposableMap
          height={800}
          projection="geoMercator"
          projectionConfig={{ scale: 200000, center: [-58.43, -34.62] }}
        >
          <GeographyItem caba setSelectedProvince={setSelectedProvince} />
        </ComposableMap>
      </Box>
    </Box>
  );
};

export default memo(Map);
