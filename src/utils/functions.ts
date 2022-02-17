import { PopulationDataItem, VaccineDataItem } from './types';
import { provincePopulations } from './staticData.json';
import numeral from 'numeral';

export const formatNumbers = (num: number, type: string): string => {
  if (numeral.locales.ar === undefined) {
    numeral.register('locale', 'ar', {
      delimiters: {
        thousands: '.',
        decimal: ',',
      },
      abbreviations: {
        thousand: 'k',
        million: 'm',
      },
    });
  }
  numeral.locale('ar');
  return type === 'percentage'
    ? num.toLocaleString('es-AR', {
        style: 'percent',
        minimumFractionDigits: 2,
      })
    : type === 'shortNumber'
    ? numeral(num).format('0.00a')
    : numeral(num).format('0,0');
};

export const getCurrentProvinceData = <T extends VaccineDataItem | PopulationDataItem>(
  data: T[],
  selectedProvince: string
): T[] => data.filter(province => province.jurisdiccion_nombre === selectedProvince);

export const getProvincePopulation = (
  provincePopulation: PopulationDataItem[],
  selectedProvince: string
): number => {
  const result = getCurrentProvinceData(provincePopulation, selectedProvince);
  if (!result[0]) return 0;
  return result[0].poblacion_estimada_2021;
};

export const formatVaccineDataItem = (
  data: VaccineDataItem[]
): {
  firstDose: number;
  secondDose: number;
  onlyDose: number;
  booster: number;
  additional: number;
  partialVax: number;
  fullVax: number;
} => {
  const initialList = data.reduce(
    (
      acc: {
        firstDose: number;
        secondDose: number;
        onlyDose: number;
        booster: number;
        additional: number;
      },
      province: VaccineDataItem
    ) => {
      if (province.jurisdiccion_codigo_indec === null) return acc;
      const firstDose = acc.firstDose + province.primera_dosis_cantidad;
      const secondDose = acc.secondDose + province.segunda_dosis_cantidad;
      const onlyDose =
        acc.onlyDose + (province.dosis_unica_cantidad ? province.dosis_unica_cantidad : 0);
      const booster =
        acc.booster + (province.dosis_refuerzo_cantidad ? province.dosis_refuerzo_cantidad : 0);
      const additional =
        acc.additional +
        (province.dosis_adicional_cantidad ? province.dosis_adicional_cantidad : 0);
      return { firstDose, secondDose, onlyDose, booster, additional };
    },
    { firstDose: 0, secondDose: 0, onlyDose: 0, booster: 0, additional: 0 }
  );
  return {
    ...initialList,
    partialVax: initialList.firstDose,
    fullVax: initialList.secondDose + initialList.onlyDose,
  };
};

export const formatVaccineData = (
  data: VaccineDataItem[]
): { [data: string]: [number, number, number] } => {
  return data.reduce((acc, province: VaccineDataItem) => {
    if (province.jurisdiccion_codigo_indec === null || province.jurisdiccion_codigo_indec === 0)
      return acc;
    const first = province.primera_dosis_cantidad;
    const second = province.segunda_dosis_cantidad + province.dosis_unica_cantidad;
    const third = province.dosis_refuerzo_cantidad;
    if (!acc[province.jurisdiccion_nombre]) {
      acc[province.jurisdiccion_nombre] = [first, second, third];
    } else {
      acc[province.jurisdiccion_nombre][0] += first;
      acc[province.jurisdiccion_nombre][1] += second;
      acc[province.jurisdiccion_nombre][2] += third;
    }
    return acc;
  }, {});
};

export const aggregateFormattedData = (data: {
  [name: string]: [number, number];
}): [number, number] => {
  return Object.keys(data).reduce(
    (acc: [number, number], item) => {
      acc[0] += data[item][0];
      acc[1] += data[item][1];
      return acc;
    },
    [0, 0]
  );
};

export const formatVaccineOrigin = (
  data: VaccineDataItem[],
  vaccineNameArray: string[]
): { [key: string]: number } => {
  let vaccineArray = {};
  vaccineNameArray.map(vaccineName => {
    vaccineArray[vaccineName] = data
      .filter(row => row.vacuna_nombre === vaccineName)
      .reduce((acc: number, province: VaccineDataItem) => {
        if (province['jurisdiccion_codigo_indec'] === null) return acc;
        acc += province['primera_dosis_cantidad'];
        acc += province['segunda_dosis_cantidad'];
        acc += province['dosis_unica_cantidad'];
        acc += province['dosis_refuerzo_cantidad'];
        acc += province['dosis_adicional_cantidad'];
        return acc;
      }, 0);
  });
  return vaccineArray;
};

export const fetcher = async (url: string): Promise<any> => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  }).then(res => res.json());
};

export const getFilteredData = (
  data: VaccineDataItem[],
  selectedProvince: string
): [number, VaccineDataItem[]] => {
  const population = getProvincePopulation(provincePopulations, selectedProvince);
  let filteredData: VaccineDataItem[];
  if (selectedProvince === 'Argentina') {
    filteredData = data;
  } else {
    filteredData = getCurrentProvinceData(data, selectedProvince);
  }

  return [population, filteredData];
};

export const getProvinceNo = (selectedProvince: string): number | string => {
  return provincePopulations.find(province => province.jurisdiccion_nombre === selectedProvince)
    .jurisdiccion_codigo_indec;
};
