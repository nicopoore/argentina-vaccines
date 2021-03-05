import React, { useContext } from 'react';

import { Geographies, Geography } from 'react-simple-maps';
import { SelectionContext } from '../../utils/SelectionContext';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/argentina/argentina-provinces.json';

interface Props {
  setSelectedProvince: (_: string) => void;
  caba?: boolean;
}

const GeographyItem: React.FC<Props> = ({ setSelectedProvince, caba }): JSX.Element => {
  const filter = caba ? geo => geo.properties['NAME_1'] === 'Ciudad de Buenos Aires' : geo => geo;
  const selectedProvince = useContext(SelectionContext);

  return (
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
                isSelected
                  ? setSelectedProvince('Argentina')
                  : setSelectedProvince(displayProvince);
              }}
            />
          );
        })
      }
    </Geographies>
  );
};

export default GeographyItem;
