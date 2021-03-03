import React, { useContext } from 'react';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { SelectionContext } from '../../utils/SelectionContext';
import DoseInfo from './DoseInfo';
import PieCharts from './PieCharts';
import useSWR from 'swr';
import { VaccineDataItem } from '../../utils/types';

const DataCard: React.FC = (): JSX.Element => {
  const fetcher = async (url: string): Promise<any> =>
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    }).then(res => res.json());
  const { data, error } = useSWR('/api/data', fetcher);

  if (error)
    return (
      <>
        <Grid item>Error al recolectar datos</Grid>
        <Grid item>Error: {error.name}</Grid>
        <Grid item>Message: {error.message}</Grid>
      </>
    );

  const selectedProvince = useContext(SelectionContext);

  const places = ['province', 'country'];
  const doses = [1, 2];

  const formatVaccineData = (data: VaccineDataItem[]): [number, number] => {
    return data.reduce(
      (acc: [number, number], province: VaccineDataItem) => {
        if (province.jurisdiccion_codigo_indec === null) return acc;
        acc[0] += province.primera_dosis_cantidad;
        acc[1] += province.segunda_dosis_cantidad;
        return acc;
      },
      [0, 0]
    );
  };

  return (
    <Grid container item alignItems="center" sm={4}>
      <Grid container item spacing={2}>
        {places.map((place: 'province' | 'country') => (
          <Grid key={place} container item xs={12}>
            <Card style={{ overflow: 'visible' }}>
              <CardContent>
                <Typography variant="h5">
                  {place === 'country' ? 'Argentina' : selectedProvince}
                </Typography>
                {doses.map((dose: 1 | 2) => (
                  <DoseInfo
                    key={dose}
                    data={data ? data.data : 'loading'}
                    dose={dose}
                    formatVaccineData={formatVaccineData}
                    place={place}
                  />
                ))}
                {place === 'country' && (
                  <PieCharts
                    data={data ? data.data : 'loading'}
                    formatVaccineData={formatVaccineData}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default DataCard;
