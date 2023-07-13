import { NextApiResponse, NextApiRequest } from 'next';

export default function cors(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  res.setHeader('Access-Control-Allow-Origin', 'https://stamurai-assignment-todo-app.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
}
