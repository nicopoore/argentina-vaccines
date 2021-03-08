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
      mb={[4, 0, 0, 0, 0]}
      minW={['70%', 300, 300, 320, 400]}
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
        top={['25%', '25%', 180, 195, 250]}
        w={['15%', '15%', '50px', '50px', '60px']}
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
