import { NextApiRequest, NextApiResponse } from 'next';
import { getHistoricData } from '../../../utils/Database/actions';
import { connectToDatabase } from '../../../utils/Database/connect';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { db } = await connectToDatabase();
  switch (req.method) {
    case 'GET':
      const historic_data = await getHistoricData(
        db,
        parseInt(
          req.query.provinceNo instanceof Array ? req.query.provinceNo[0] : req.query.provinceNo
        )
      );

      res.send(JSON.stringify(historic_data));
      return res.status(200).end();
  }
};
