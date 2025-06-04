import { NextApiRequest, NextApiResponse } from 'next';
import { openai, callOpenAI } from '../../lib/utils/openai-client';

interface APIError {
  name?: string;
  message?: string;
  status?: number;
  code?: string;
  type?: string;
  stack?: string;
  response?: {
    data?: Record<string, unknown>;
    headers?: Record<string, string>;
    statusText?: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Log API key information
    console.log('API Key Information:', {
      hasApiKey: !!process.env.OPENAI_API_KEY,
      keyLength: process.env.OPENAI_API_KEY?.length || 0,
      keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...',
      environment: process.env.NODE_ENV
    });

    // Make a test API call
    const completion = await callOpenAI(() =>
      openai.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: "Say hello!"
          }
        ],
        temperature: 0.7,
        max_tokens: 50
      })
    );

    return res.status(200).json({
      success: true,
      message: completion.choices[0].message.content,
      apiKeyInfo: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...'
      }
    });
  } catch (error: unknown) {
    const apiError = error as APIError;
    console.error('Test API call failed:', {
      error: {
        name: apiError?.name,
        message: apiError?.message,
        status: apiError?.status,
        code: apiError?.code,
        type: apiError?.type,
        stack: apiError?.stack,
        response: apiError?.response?.data,
        headers: apiError?.response?.headers,
        statusText: apiError?.response?.statusText
      },
      apiKeyInfo: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...'
      }
    });

    return res.status(500).json({
      success: false,
      error: {
        message: apiError?.message,
        status: apiError?.status,
        code: apiError?.code,
        type: apiError?.type,
        response: apiError?.response?.data
      },
      apiKeyInfo: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...'
      }
    });
  }
} 