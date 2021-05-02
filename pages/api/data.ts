import { NextApiRequest, NextApiResponse } from 'next'
import Papa from 'papaparse'
import unzipper from 'unzipper'
import request from 'request'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  switch(req.method) {
    case 'GET':
      
      const directory = await unzipper.Open.url(request, 'https://sisa.msal.gov.ar/datos/descargas/covid-19/files/Covid19VacunasAgrupadas.csv.zip')
      const file = directory.files.find(d => d.path === 'Covid19VacunasAgrupadas.csv')
      const content = await file.buffer()
      const dataCsv = content.toString()

      const result = Papa.parse(dataCsv, {
        header: true,
        dynamicTyping: true
      })
      res.send(JSON.stringify(result))
      return res.status(200).end()
    default:
      return res.status(405).end()
  }
}
