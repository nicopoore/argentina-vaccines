import Papa from 'papaparse'

export default async (req, res) => {

  const dataCsv = await fetch('https://sisa.msal.gov.ar/datos/descargas/covid-19/files/Covid19VacunasAgrupadas.csv').then(res => res.text())
  const result = Papa.parse(dataCsv, {
    header: true,
    dynamicTyping: true
  })
  res.send(JSON.stringify(result))
  res.status(200).end()

}