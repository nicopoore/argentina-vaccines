import { Box, Grid, Hidden } from '@material-ui/core';
import React, { memo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json';

const Map: React.FC<{ setTooltipContent: (_: string) => void }> = ({
  setTooltipContent,
}): JSX.Element => {
  return (
    <Grid container item alignItems="center" sm={4} xs={12}>
      <Hidden smUp>
        <Box height="1px" mt={6} width="1px" />
      </Hidden>
      <ComposableMap
        height={1130}
        projection="geoMercator"
        projectionConfig={{ scale: 1430, center: [-62, -40] }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                fill="#EAEAEC"
                geography={geo}
                stroke="#555"
                style={{
                  default: { fill: '#EAEAEC', outline: 'none' },
                  hover: { fill: '#DADADC', outline: 'none' },
                  pressed: { fill: '#DADADC', outline: 'none' },
                }}
                onMouseEnter={() => {
                  const { NAME_1 } = geo.properties;
                  setTooltipContent(NAME_1);
                }}
                onMouseLeave={() => {
                  setTooltipContent('CABA');
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </Grid>
  );
};

export default memo(Map);
