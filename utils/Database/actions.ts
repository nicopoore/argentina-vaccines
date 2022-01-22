import { Db } from 'mongodb';
import { DatabaseDateItem, VaccineDataItem } from '../types';

export const getHistoricData = async (db: Db): Promise<DatabaseDateItem[]> => {
  const historic_data: DatabaseDateItem[] = await db
    .collection('historic_data')
    .find()
    .sort({ date: -1 })
    .limit(150)
    .toArray();

  const reversedQuery = [...historic_data].reverse();
  return reversedQuery;
};

export const postLatestData = async (
  db: Db,
  currentData: VaccineDataItem,
  date: string
): Promise<void> => {
  const latest = await db.collection('historic_data').insertOne({ date: date, data: currentData });

  if (latest.insertedCount === 0)
    return Promise.reject({ statusText: 'Failed to insert latest data', status: 404 });
  return latest.insertedCount;
};

export const getLatestRecordDate = async (db: Db): Promise<string> => {
  const latest = await db.collection('historic_data').find().sort({ _id: -1 }).limit(1).toArray();

  return latest[0].date;
};
