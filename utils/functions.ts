import { PopulationDataItem, VaccineDataItem } from "./types";

export const formatNumbers = (num: number, type: string): string => {
  return type === 'percentage'
    ? num.toLocaleString('es-AR', {
        style: 'percent',
        minimumFractionDigits: 2,
      })
    : num.toLocaleString('es-AR');
};

export const getCurrentProvince = <T extends VaccineDataItem | PopulationDataItem>(data: T[], selectedProvince: string): T[] =>
  data.filter(province => province.jurisdiccion_nombre === selectedProvince);

export const getProvincePopulation = (provincePopulation: PopulationDataItem[], selectedProvince: string): number => {
  const result = getCurrentProvince(provincePopulation, selectedProvince);
  if (!result[0]) return 0;
  return result[0].poblacion_estimada_2021;
};

export const formatVaccineData = (data: VaccineDataItem[]): [number, number] => {
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

export const formatVaccineOrigin = (data: VaccineDataItem[], vaccineNameArray: string[]): {[key: string]: number} => {
  let vaccineArray = {};
  vaccineNameArray.map(vaccineName => {
    vaccineArray[vaccineName] = (
      data
        .filter(row => row.vacuna_nombre === vaccineName)
        .reduce((acc: number, province: VaccineDataItem) => {
          if (province['jurisdiccion_codigo_indec'] === null) return acc;
          acc += province['primera_dosis_cantidad'];
          return acc;
        }, 0)
    );
  });
  return vaccineArray;
};