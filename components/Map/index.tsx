import { Box } from '@chakra-ui/react';
import React, { memo } from 'react';
import { ComposableMap } from 'react-simple-maps';
import GeographyItem from './GeographyItem';

interface Props {
  setSelectedProvince: (_: string) => void;
}

const Map: React.FC<Props> = ({ setSelectedProvince }): JSX.Element => {
  return (
    <Box pb={2} position="relative" w={400}>
      <ComposableMap
        height={1730}
        projection="geoMercator"
        projectionConfig={{ scale: 2200, center: [-64, -40] }}
      >
        <GeographyItem setSelectedProvince={setSelectedProvince} />
      </ComposableMap>
      <Box left={320} position="absolute" top={250} w="60px">
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
