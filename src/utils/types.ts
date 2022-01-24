import { ObjectId } from 'mongodb';

export interface VaccineDataItem {
  jurisdiccion_codigo_indec: string | number;
  jurisdiccion_nombre: string;
  primera_dosis_cantidad: number;
  segunda_dosis_cantidad: number;
  dosis_unica_cantidad: number;
  dosis_adicional_cantidad: number;
  dosis_refuerzo_cantidad: number;
  vacuna_nombre: string;
}

export interface PopulationDataItem {
  jurisdiccion_codigo_indec: number;
  jurisdiccion_nombre: string;
  poblacion_estimada_2021: number;
  info_website: string;
}

export interface FullVaccineTypeItem {
  shortName?: string;
  name: string;
  provider?: string;
  countryProduced?: string[];
  purchased?: number;
  arrived?: number;
  administered?: number;
}

export interface RawVaccineTypeItem {
  shortName?: string;
  name: string;
  provider?: string;
  countryProduced?: string[];
  purchased?: number;
  arrived?: number;
}

export interface DatabaseDateItem {
  _id: ObjectId;
  date: string;
  jurisdiccion_codigo_indec: string | number;
  jurisdiccion_nombre: string;
  data: {
    partialVax: number;
    fullVax: number;
    booster: number;
  };
}
