import { Box, Grid } from "@material-ui/core";
import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json";

const Map = ({ setTooltipContent }): JSX.Element => {
  const size = 300;
  return (
    <Box
      width="100%"
      height="100vh"
      overflow="hidden"
      top={0}
      left={0}
      position="absolute"
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 450, center: [-62, -50] }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                fill="#EAEAEC"
                geography={geo}
                stroke="#000"
                onMouseEnter={() => {
                  const { NAME_1 } = geo.properties;
                  setTooltipContent(NAME_1);
                }}
                onMouseLeave={() => {
                  setTooltipContent("Ciudad de Buenos Aires");
                }}
              ></Geography>
            ))
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default memo(Map);
