import { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://www.nytimes.com/svc/wordle/v2';

// 2021-06-19 - First puzzle

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { date } = req.query;
  const response = await fetch(`${API_URL}/${date}.json`);
  const data = await response.json();

  res.status(200).json(data);
}

export default handler;
