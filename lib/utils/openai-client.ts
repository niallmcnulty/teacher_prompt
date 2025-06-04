import OpenAI from 'openai';

// Rate limiter configuration
const RATE_LIMIT = {
  requestsPerMinute: 60, // OpenAI's default rate limit
  maxRetries: 3,
  retryDelay: 1000, // 1 second
};

// Custom error class for OpenAI API errors
export class OpenAIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = 'OpenAIError';
  }
}

// Initialize OpenAI client with error handling
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: RATE_LIMIT.maxRetries,
  timeout: 30000, // 30 seconds timeout for all requests
  defaultHeaders: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

interface APIError {
  name?: string;
  status?: number;
  message?: string;
  code?: string;
  type?: string;
  stack?: string;
  response?: {
    data?: unknown;
    headers?: Record<string, string>;
    statusText?: string;
  };
}

function isRetryableError(error: APIError): boolean {
  // Retry on server errors (5xx) and rate limits (429)
  return error?.status ? error.status >= 500 || error.status === 429 : false;
}

// Wrapper function for OpenAI API calls with rate limiting and error handling
export async function callOpenAI<T>(
  apiCall: () => Promise<T>,
  retryCount: number = 0,
  timeout: number = 30000
): Promise<T> {
  console.log('Making OpenAI API call with config:', {
    hasApiKey: !!process.env.OPENAI_API_KEY,
    keyLength: process.env.OPENAI_API_KEY?.length || 0,
    keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...',
    timeout,
    retryCount
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const result = await apiCall();
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    const apiError = error as APIError;
    console.error('OpenAI API call failed:', {
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
      config: {
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0,
        keyPrefix: process.env.OPENAI_API_KEY?.substring(0, 10) + '...',
        timeout,
        retryCount
      }
    });

    if (retryCount < RATE_LIMIT.maxRetries && isRetryableError(apiError)) {
      console.log(`Retrying API call (attempt ${retryCount + 1} of ${RATE_LIMIT.maxRetries})...`);
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT.retryDelay));
      return callOpenAI(apiCall, retryCount + 1, timeout);
    }

    throw error;
  }
}

// Export the configured OpenAI client
export { openai }; 