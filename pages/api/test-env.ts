import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Return environment variable information (excluding sensitive data)
  res.status(200).json({
    hasApiKey: !!process.env.OPENAI_API_KEY,
    apiKeyPrefix: process.env.OPENAI_API_KEY?.substring(0, 8) + '...',
    keyLength: process.env.OPENAI_API_KEY?.length || 0,
    environment: process.env.NODE_ENV
  });
} 