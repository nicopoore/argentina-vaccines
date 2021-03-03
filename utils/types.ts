export interface VaccineDataItem {
  jurisdiccion_codigo_indec: number,
  jurisdiccion_nombre: string,
  primera_dosis_cantidad: number,
  segunda_dosis_cantidad: number,
  vacuna_nombre: string
}

export interface PopulationDataItem {
  jurisdiccion_codigo_indec: number,
  jurisdiccion_nombre: string,
  poblacion_estimada_2021: number,
}