// Dependencies
import React, { useContext } from 'react';
import { Geographies, Geography } from 'react-simple-maps';

// Utils
import { SelectionContext } from 'utils/Context';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json';

interface Props {
  setSelectedProvince: (_: string) => void;
  caba?: boolean;
}

const MapItem: React.FC<Props> = ({ setSelectedProvince, caba }): JSX.Element => {
  const filter = caba ? geo => geo.properties['NAME_1'] === 'Ciudad de Buenos Aires' : geo => geo;
  const selectedProvince = useContext(SelectionContext);

  return (
    <>
      <rect
        fill="transparent"
        height="100%"
        width="100%"
        onClick={() => setSelectedProvince('Argentina')}
      />
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.filter(filter).map(geo => {
            const displayProvince =
              geo.properties.NAME_1 === 'Ciudad de Buenos Aires' ? 'CABA' : geo.properties.NAME_1;
            const isSelected = displayProvince === selectedProvince ? true : false;
            return (
              <Geography
                key={geo.rsmKey}
                fill={isSelected ? '#8cb4f5' : '#EAEAEC'}
                geography={geo}
                stroke="#555"
                strokeWidth={caba && 8}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: isSelected ? '#5d91e3' : '#DADADC', outline: 'none' },
                  pressed: { fill: isSelected ? '#8cb4f5' : '#DADADC', outline: 'none' },
                }}
                onClick={() => {
                  setSelectedProvince(isSelected ? 'Argentina' : displayProvince);
                }}
              />
            );
          })
        }
      </Geographies>
    </>
  );
};

export default MapItem;
