import { NextApiRequest, NextApiResponse } from 'next';
import {
  getLatestDBData,
  getHistoricData,
  postLatestDataToFormattedDB,
  postLatestRawData,
} from 'utils/Database/actions';
import { connectToDatabase } from 'utils/Database/connect';
import Papa from 'papaparse';
import unzipper from 'unzipper';
import request from 'request';
import { isEqual } from 'lodash';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { db } = await connectToDatabase();
  switch (req.method) {
    case 'GET':
      const historic_data = await getHistoricData(db, 100);

      res.send(JSON.stringify(historic_data));
      res.status(200).end();
      return;

    case 'POST':
      let currentDate = new Date();

      currentDate.setHours(currentDate.getHours() - 3); // Account for Argentinian timezone
      const formattedDate = currentDate.toISOString().slice(0, 10);

      const latestDBData = await getLatestDBData(db);
      if (latestDBData.date === formattedDate) {
        res.send("Today's data already in database");
        res.status(200).end();
        return;
      }

      const directory = await unzipper.Open.url(
        request,
        'https://sisa.msal.gov.ar/datos/descargas/covid-19/files/Covid19VacunasAgrupadas.csv.zip'
      );
      const file = directory.files.find(d => d.path === 'Covid19VacunasAgrupadas.csv');
      const content = await file.buffer();
      const dataCsv = content.toString();
      const result = Papa.parse(dataCsv, {
        header: true,
        dynamicTyping: true,
      });

      if (isEqual(result.data, latestDBData.data)) {
        res.send("Today's data hasn't been uploaded to the official dataset yet");
        res.status(200).end();
        return;
      }

      const insertedFormattedRes = await postLatestDataToFormattedDB(
        db,
        result.data,
        formattedDate
      );
      const insertedRawRes = await postLatestRawData(db, result.data, formattedDate);
      res.send({ insertedFormattedRes, insertedRawRes });
      res.status(200).end();
      return;

    default:
      res.status(405).end();
      return;
  }
};
