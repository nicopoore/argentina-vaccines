import React from 'react';
import TitleXs from './TitleXs';
import TitleSm from './TitleSm';
import { Grid } from '@material-ui/core';

const Title: React.FC = (): JSX.Element => (
  <Grid container item alignItems="center" justify="flex-end" sm={4}>
    <TitleXs />
    <TitleSm />
  </Grid>
);

export default Title;
