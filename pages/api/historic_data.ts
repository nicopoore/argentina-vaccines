import { NextApiRequest, NextApiResponse } from 'next'
import { getHistoricData,  getLatestRecordDate, postLatestData } from '../../utils/Database/actions';
import { connectToDatabase } from '../../utils/Database/connect'
import Papa from 'papaparse'
import unzipper from 'unzipper'
import request from 'request'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  const { db } = await connectToDatabase();
  switch(req.method) {
    case 'GET':

      const historic_data = await getHistoricData(db)

      res.send(JSON.stringify(historic_data))
      return res.status(200).end()

    case 'POST':
      let currentDate = new Date();

      // Account for Argentinian timezone and average time of daily data upload
      currentDate.setHours(currentDate.getHours() - 16)
      const formattedDate = currentDate.toISOString().slice(0, 10);

      const latestDate = await getLatestRecordDate(db)
      if (latestDate === formattedDate) {
        res.send('Latest data already in database')
        return res.status(200).end()
      }

      const directory = await unzipper.Open.url(request, 'https://sisa.msal.gov.ar/datos/descargas/covid-19/files/Covid19VacunasAgrupadas.csv.zip')
      const file = directory.files.find(d => d.path === 'Covid19VacunasAgrupadas.csv')
      const content = await file.buffer()
      const dataCsv = content.toString()
      const result = Papa.parse(dataCsv, {
        header: true,
        dynamicTyping: true
      })

      const insertedResponse = await postLatestData(db, result.data, formattedDate)
      res.send(insertedResponse)
      return res.status(200).end()

    default:
      return res.status(405).end()
  }
}
