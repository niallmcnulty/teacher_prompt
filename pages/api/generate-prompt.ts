import { NextApiRequest, NextApiResponse } from 'next';
import { openai, callOpenAI, OpenAIError } from '../../lib/utils/openai-client';

interface GeneratePromptRequest {
  grade: number;
  topic: string;
  learningObjectType: string;
  scaffoldingLevel: string;
  bloomsLevel: string;
  includeSouthAfricanContext: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      grade,
      topic,
      learningObjectType,
      scaffoldingLevel,
      bloomsLevel,
      includeSouthAfricanContext
    } = req.body as GeneratePromptRequest;

    // Create the prompt for OpenAI
    const systemPrompt = `You are an expert EMS (Economic and Management Sciences) teacher in South Africa. 
Your task is to generate high-quality learning materials that align with the CAPS curriculum.
Focus on creating engaging, practical, and locally relevant content.`;

    const userPrompt = `Generate a ${learningObjectType.toLowerCase()} for Grade ${grade} EMS on the topic of ${topic}.

Key Requirements:
- Grade Level: ${grade}
- Topic: ${topic}
- Learning Object Type: ${learningObjectType}
- Scaffolding Level: ${scaffoldingLevel}
- Bloom's Taxonomy Level: ${bloomsLevel}
${includeSouthAfricanContext ? '- Include South African context and examples' : ''}

Please provide a detailed, well-structured response that includes:
1. Clear learning objectives
2. Appropriate content and activities
3. Assessment methods
4. Required resources
5. Time allocation
6. Differentiation strategies`;

    try {
      // Call OpenAI API
      console.log('Attempting to call OpenAI API for prompt generation...', {
        model: "gpt-4",
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0
      });

      const completion = await callOpenAI(() =>
        openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.7,
          max_tokens: 2000
        }),
        0, // retryCount
        60000 // 60 second timeout for prompt generation
      );

      console.log('OpenAI API call successful, getting content...');
      const generatedPrompt = completion.choices[0].message.content;
      if (!generatedPrompt) {
        throw new Error('No content received from OpenAI API');
      }

      return res.status(200).json({ prompt: generatedPrompt });
    } catch (error: any) {
      console.error('OpenAI API error details:', {
        name: error?.name,
        message: error?.message,
        status: error?.status,
        code: error?.code,
        type: error?.type,
        stack: error?.stack,
        response: error?.response?.data,
        headers: error?.response?.headers,
        statusText: error?.response?.statusText,
        hasApiKey: !!process.env.OPENAI_API_KEY,
        keyLength: process.env.OPENAI_API_KEY?.length || 0
      });
      return res.status(500).json({ 
        error: 'Error generating prompt with OpenAI',
        details: error?.message || 'Unknown error occurred'
      });
    }
  } catch (error) {
    console.error('Error in prompt generation:', error);
    return res.status(500).json({ error: 'Error processing request' });
  }
} 