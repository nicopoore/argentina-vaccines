import { Db } from 'mongodb';
import { DatabaseDateItem, VaccineDataItem } from '../types';

export const getHistoricData = async (db: Db, provinceNo: number): Promise<DatabaseDateItem[]> => {
  const historic_data: DatabaseDateItem[] = await db
    .collection('historic_data_new')
    .find({ jurisdiccion_codigo_indec: provinceNo })
    .sort({ date: 1 })
    .toArray();

  return historic_data;
};

export const postLatestData = async (
  db: Db,
  currentData: VaccineDataItem[],
  date: string
): Promise<void> => {
  const formatDataForDB = (
    unformattedData: VaccineDataItem[],
    date: string
  ): Omit<DatabaseDateItem, '_id'>[] => {
    const formattedData = unformattedData.reduce(
      (newArray: Omit<DatabaseDateItem, '_id'>[], dataItem) => {
        if (!dataItem.jurisdiccion_codigo_indec) return newArray;

        const getExistingEntryIndex = (
          arr: Omit<DatabaseDateItem, '_id'>[],
          date: string,
          currentProvinceVaxCombo: VaccineDataItem
        ): number => {
          const existingEntryIndex = arr.findIndex(
            item =>
              item.date === date &&
              item.jurisdiccion_codigo_indec === currentProvinceVaxCombo.jurisdiccion_codigo_indec
          );
          return existingEntryIndex;
        };

        const existingEntryIndex = getExistingEntryIndex(newArray, date, dataItem);

        if (existingEntryIndex >= 0) {
          const existingEntry = newArray[existingEntryIndex];
          const newEntryData = {
            ...existingEntry.data,
            partialVax: existingEntry.data.partialVax + dataItem.primera_dosis_cantidad,
            fullVax:
              existingEntry.data.fullVax +
              dataItem.segunda_dosis_cantidad +
              (dataItem.dosis_unica_cantidad ? dataItem.dosis_unica_cantidad : 0),
            booster:
              existingEntry.data.booster +
              (dataItem.dosis_refuerzo_cantidad ? dataItem.dosis_refuerzo_cantidad : 0),
          };
          newArray[existingEntryIndex] = { ...existingEntry, data: newEntryData };
        } else {
          newArray = [
            ...newArray,
            {
              date: date,
              jurisdiccion_codigo_indec: dataItem.jurisdiccion_codigo_indec,
              jurisdiccion_nombre: dataItem.jurisdiccion_nombre,
              data: {
                partialVax: dataItem.primera_dosis_cantidad,
                fullVax:
                  dataItem.segunda_dosis_cantidad +
                  (dataItem.dosis_unica_cantidad ? dataItem.dosis_unica_cantidad : 0),
                booster: dataItem.dosis_refuerzo_cantidad ? dataItem.dosis_refuerzo_cantidad : 0,
              },
            },
          ];
        }

        return newArray;
      },
      []
    );

    const argentinaData = formattedData.reduce(
      (arg, prov) => {
        arg.data.partialVax += prov.data.partialVax;
        arg.data.fullVax += prov.data.fullVax;
        arg.data.booster += prov.data.booster;
        return arg;
      },
      {
        date: date,
        jurisdiccion_nombre: 'Argentina',
        jurisdiccion_codigo_indec: 100,
        data: {
          partialVax: 0,
          fullVax: 0,
          booster: 0,
        },
      }
    );

    return [...formattedData, argentinaData];
  };

  const latest = await db
    .collection('historic_data_new')
    .insertOne(formatDataForDB(currentData, date));

  if (latest.insertedCount === 0)
    return Promise.reject({ statusText: 'Failed to insert latest data', status: 404 });
  return latest.insertedCount;
};

export const getLatestRecordDate = async (db: Db): Promise<string> => {
  const latest = await db.collection('historic_data').find().sort({ _id: -1 }).limit(1).toArray();

  return latest[0].date;
};
