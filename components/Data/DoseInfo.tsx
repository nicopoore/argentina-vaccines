import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { VaccineNumbers } from '..';
import { VaccineDataItem } from '../types';

interface DoseInfoProps {
  place: 'country' | 'province';
  dose: 1 | 2;
  data: VaccineDataItem[] | 'loading';
  // eslint-disable-next-line no-unused-vars
  formatVaccineData: (data: VaccineDataItem[]) => [number, number];
}

const DoseInfo: React.FC<DoseInfoProps> = (props): JSX.Element => {
  return (
    <Box my={1}>
      <Grid item style={{ minWidth: 350 }}>
        <Typography variant="h6">{props.dose === 1 ? 'Primera dosis' : 'Ambas dosis'}</Typography>
        <Grid container>
          {['raw', 'percentage'].map((numberType: 'raw' | 'percentage') => (
            <Grid key={numberType} item xs={6}>
              <VaccineNumbers
                data={props.data}
                dose={props.dose}
                formatVaccineData={props.formatVaccineData}
                numberType={numberType}
                place={props.place}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoseInfo;
