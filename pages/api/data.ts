import { NextApiRequest, NextApiResponse } from 'next'
import Papa from 'papaparse'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

  switch(req.method) {
    case 'GET':
      const dataCsv = await fetch('https://sisa.msal.gov.ar/datos/descargas/covid-19/files/Covid19VacunasAgrupadas.csv').then(res => res.text())
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
