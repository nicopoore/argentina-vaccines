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

export const postLatestDataToFormattedDB = async (
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
          const updateEntry = (
            existingEntry: Omit<DatabaseDateItem, '_id'>,
            currentItem: VaccineDataItem,
            array: Omit<DatabaseDateItem, '_id'>[],
            index: number
          ): void => {
            const partialVax = existingEntry.data.partialVax + currentItem.primera_dosis_cantidad;
            const fullVax =
              existingEntry.data.fullVax +
              currentItem.segunda_dosis_cantidad +
              (currentItem.dosis_unica_cantidad ? currentItem.dosis_unica_cantidad : 0);
            const booster =
              existingEntry.data.booster +
              (currentItem.dosis_refuerzo_cantidad ? currentItem.dosis_refuerzo_cantidad : 0);

            const newEntryData = {
              ...existingEntry.data,
              partialVax,
              fullVax,
              booster,
            };
            array[index] = { ...existingEntry, data: newEntryData };
          };

          updateEntry(newArray[existingEntryIndex], dataItem, newArray, existingEntryIndex);
        } else {
          const addEntryToArray = (
            currentItem: VaccineDataItem,
            array: Omit<DatabaseDateItem, '_id'>[]
          ): Omit<DatabaseDateItem, '_id'>[] => {
            return [
              ...array,
              {
                date,
                jurisdiccion_codigo_indec: currentItem.jurisdiccion_codigo_indec,
                jurisdiccion_nombre: currentItem.jurisdiccion_nombre,
                data: {
                  partialVax: currentItem.primera_dosis_cantidad,
                  fullVax:
                    currentItem.segunda_dosis_cantidad +
                    (currentItem.dosis_unica_cantidad ? currentItem.dosis_unica_cantidad : 0),
                  booster: currentItem.dosis_refuerzo_cantidad
                    ? currentItem.dosis_refuerzo_cantidad
                    : 0,
                },
              },
            ];
          };

          newArray = addEntryToArray(dataItem, newArray);
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
        date,
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
    .insertMany(formatDataForDB(currentData, date));

  if (latest.insertedCount === 0)
    return Promise.reject({ statusText: 'Failed to insert latest data', status: 404 });
  return latest.insertedCount;
};

export const postLatestRawData = async (
  db: Db,
  data: VaccineDataItem[],
  date: string
): Promise<number> => {
  const latest = await db.collection('historic_data').insertOne({ date, data });

  if (latest.insertedCount === 0)
    return Promise.reject({ statusText: 'Failed to insert latest data', status: 404 });
  return latest.insertedCount;
};

export const getLatestRecordDate = async (db: Db): Promise<string> => {
  const latest = await db.collection('historic_data').find().sort({ _id: -1 }).limit(1).toArray();

  return latest[0].date;
};

export const getLatestDBData = async (db: Db): Promise<DatabaseDateItem> => {
  const latest = await db.collection('historic_data').find().sort({ _id: -1 }).limit(1).toArray();

  return latest[0];
};

export const checkIfDatabaseIsUpdated = async (db: Db, date: string): Promise<boolean> => {
  const databaseIsUpdated = await db
    .collection('historic_data')
    .countDocuments({ date: date }, { limit: 1 });
  return databaseIsUpdated === 1;
};
