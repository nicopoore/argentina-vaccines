import { Box, Hidden } from "@material-ui/core";
import React, { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json";

const Map = ({ setTooltipContent }): JSX.Element => {
  const size = 300;
  return (
    <Box>
      <Hidden smUp>
        <Box mt={6}></Box>
      </Hidden>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 900, center: [-62, -40] }}
        height={750}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                fill="#EAEAEC"
                geography={geo}
                stroke="#555"
                onMouseEnter={() => {
                  const { NAME_1 } = geo.properties;
                  setTooltipContent(NAME_1);
                }}
                onMouseLeave={() => {
                  setTooltipContent("Ciudad de Buenos Aires");
                }}
                style={{
                  default: { fill: "#EAEAEC", outline: "none" },
                  hover: { fill: "#DADADC", outline: "none" },
                  pressed: { fill: "#DADADC", outline: "none" },
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
